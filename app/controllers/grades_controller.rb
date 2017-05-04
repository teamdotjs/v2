class GradesController < ApplicationController
  # { grade } = {
  #   id: int,
  #   question: { id: int, prompt: '' },
  #   value: '',
  #   duration: int, (in seconds)
  #   is_correct: true/false
  # }
  before_action :signed_in?
  before_action :correct_user?, only: [:course, :course_summaries]

  # GET /api/grade
  # Desc: return all grades for current user
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: [{ grade }]
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  def index
    user = User.find(session[:user_id][:value])
    render json: Grade.where(user: user)
  end

  # GET /api/grade/summaries
  # Desc: return lesson grade summaries for all lessons
  #   in courses the current user is assigned to
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: [{
  #     id: int,
  #     title: '',
  #     grade_summaries: [{
  #       type: '',
  #       total_correct: int,
  #       total_questions: int
  #     }]
  #   }]
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  def index_summaries
    user = User.includes(courses: [lessons: [practices: :questions]])
               .references(:courses)
               .find(session[:user_id][:value])
    summaries = aggregate_grades(user, user.courses)
    render json: summaries
  end

  # POST /api/grade
  # Desc: return true/false if answer provided is correct
  # Request body params:
  #   question_id (int)
  #   value (string)
  # Success response:
  #   Code: 200
  #   Content: true/false
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 404
  #   Content: { errors: ['Couldn't find Question with 'id'=int'],
  #              error_message: 'Question could not be found' }
  def create
    question = Question.find(params[:question_id])
    user = User.find(session[:user_id][:value])
    grade = Grade.create(user: user, question: question, value: params[:value])
    render json: grade.as_json['is_correct']
  end

  # GET /api/grade/course/:id
  # Desc: return all grades for course specified by id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: [{ user: { user }, grades: [{ grade }] }]
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 403
  #   Content: { errors: ['Forbidden'], error_message: 'Forbidden' }
  #   (3) Code: 404
  #   Content: { errors: ['Couldn't find Course with 'id'=int'],
  #              error_message: 'Course could not be found' }
  def course
    grades = []
    @course.students.each do |student|
      grades << { user: student, grades: Grade.where(user: student) }
    end
    render json: grades
  end

  # GET /api/grade/course/:id/summaries
  # Desc: return lesson grade summaries for all students in the course specified by id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: [{
  #     user: { user },
  #     lessons: [{
  #       id: int,
  #       title: '',
  #       grade_summaries: [{
  #         type: '',
  #         total_correct: int,
  #         total_questions: int
  #       }]
  #     }]
  #   }]
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  def course_summaries
    summaries = []
    @course.students.each do |student|
      summaries << {
        user: student,
        lessons: aggregate_grades(student, [@course])
      }
    end
    render json: summaries
  end

  private

  def correct_user?
    @course = Course.includes(lessons: [practices: :questions])
                    .references(:lessons)
                    .find(params[:id])
    return if @course.instructor_id == session[:user_id][:value]
    render json: { errors: ['Forbidden'], error_message: 'Forbidden' }, status: :forbidden # 403
  end

  def aggregate_grades(user, courses)
    summaries = []
    courses.each do |course|
      course.lessons.each do |lesson|
        grade_summaries = []
        lesson.practices.each do |practice|
          grade_summaries << {
            type: practice.type,
            total_correct: nil,
            total_questions: practice.questions.length
          }
        end
        lesson_summary = {
          id: lesson.id,
          title: lesson.title,
          grade_summaries: grade_summaries
        }
        summaries << lesson_summary
      end
    end
    grades = Grade.includes(question: [:options, :prompts, { practice: :lesson }])
                  .references(:question)
                  .where(user: user)
    grades.each do |grade|
      practice = grade.question.practice
      lesson = summaries.find { |l| l[:id] == practice.lesson.id }
      grade_summary = lesson[:grade_summaries].find { |g| g[:type] == practice.type }
      grade_summary[:total_correct] = 0 if grade_summary[:total_correct].nil?
      grade_summary[:total_correct] += 1 if grade.as_json['is_correct']
    end
    summaries
  end
end
