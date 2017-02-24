class CoursesController < ApplicationController
  # { course } = {
  #   id: int,
  #   title: '',
  #   instuctor_id: int
  # }
  before_action :signed_in?
  before_action :correct_user?,
                only: [:destroy, :add_lesson, :remove_lesson, :add_student, :remove_student]

  # GET /api/course
  # Desc: returns all courses that the current user
  #   is an instructor for and is a student in
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: [{ course }]
  # Error response:
  #   Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  def index
    render json: Course.all
  end

  # POST /api/course
  # Desc: creates a new course for the current user
  # Request body params:
  #   title (string - optional - defaults to 'Untitled')
  # Success response:
  #   Code: 200
  #   Content: { course }
  # Error response:
  #   Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  def create
    render json: Course.all
  end

  # GET /api/course/:id
  # Desc: return course specified by id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: { course }
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 404
  #   Content: { errors: ['Couldn't find Course with 'id'=int'],
  #              error_message: 'Course could not be found' }
  def show
    render json: Course.find(params[:id])
  end

  # DELETE /api/course/:id
  # Desc: deletes course specified by id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: { deleted: true }
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 403
  #   Content: { errors: ['Forbidden'], error_message: 'Forbidden' }
  #   (3) Code: 404
  #   Content: { errors: ['Couldn't find Course with 'id'=int'],
  #              error_message: 'Course could not be found' }
  def destroy
    render json: @course
  end

  # GET /api/course/:id/lesson
  # Desc: return lessons in course specified by id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: [{ id: int, title: '' }]
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 404
  #   Content: { errors: ['Couldn't find Course with 'id'=int'],
  #              error_message: 'Course could not be found' }
  def lessons
    render json: Course.find(params[:id])
  end

  # PATCH /api/course/:id/lesson
  # Desc: adds lesson to course specified by id
  # Request body params:
  #   lesson_id (int)
  # Success response:
  #   Code: 200
  #   Content: [{ id: int, title: '' }]
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 403
  #   Content: { errors: ['Forbidden'], error_message: 'Forbidden' }
  #   (3) Code: 404
  #   Content: { errors: ['Couldn't find Course with 'id'=int'],
  #              error_message: 'Course could not be found' }
  #   (4) Code: 409
  #   Content: { errors: ['Lesson already added to this course'],
  #              error_message: 'Lesson already added to this course' }
  def add_lesson
    render json: @course
  end

  # DELETE /api/course/:id/lesson/:l_id
  # Desc: removes lesson from course specified by id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: [{ id: int, title: '' }]
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 403
  #   Content: { errors: ['Forbidden'], error_message: 'Forbidden' }
  #   (3) Code: 404
  #   Content: { errors: ['Couldn't find Course with 'id'=int'],
  #              error_message: 'Course could not be found' }
  #   (4) Code: 409
  #   Content: { errors: ['Lesson is not in this course'],
  #              error_message: 'Lesson is not in this course' }
  def remove_lesson
    render json: @course
  end

  # GET /api/course/:id/student
  # Desc: return students in course specified by id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: [{ id: int, name: string, email: string, birthday: date }]
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 404
  #   Content: { errors: ['Couldn't find Course with 'id'=int'],
  #              error_message: 'Course could not be found' }
  def students
    render json: Course.find(params[:id])
  end

  # PATCH /api/course/:id/student
  # Desc: adds student to course specified by id
  # Request body params:
  #   student_id (int)
  # Success response:
  #   Code: 200
  #   Content: [{ id: int, name: string, email: string, birthday: date }]
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 403
  #   Content: { errors: ['Forbidden'], error_message: 'Forbidden' }
  #   (3) Code: 404
  #   Content: { errors: ['Couldn't find Course with 'id'=int'],
  #              error_message: 'Course could not be found' }
  #   (4) Code: 409
  #   Content: { errors: ['Student already added to this course'],
  #              error_message: 'Student already added to this course' }
  def add_student
    render json: @course
  end

  # DELETE /api/course/:id/student/:s_id
  # Desc: removes student from course specified by id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: [{ id: int, name: string, email: string, birthday: date }]
  # Error response:
  #   (1) Code: 401
  #   Content: { errors: ['Unauthorized'], error_message: 'Unauthorized' }
  #   (2) Code: 403
  #   Content: { errors: ['Forbidden'], error_message: 'Forbidden' }
  #   (3) Code: 404
  #   Content: { errors: ['Couldn't find Course with 'id'=int'],
  #              error_message: 'Course could not be found' }
  #   (4) Code: 409
  #   Content: { errors: ['Student is not in this course'],
  #              error_message: 'Student is not in this course' }
  def remove_student
    render json: @course
  end

  private

  def correct_user?
    @course = Course.find(params[:id])
    return if @course.instructor_id == session[:user_id][:value]
    render json: { errors: ['Forbidden'], error_message: 'Forbidden' }, status: :forbidden # 403
  end
end
