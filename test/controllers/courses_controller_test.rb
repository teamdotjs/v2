require 'test_helper'

class CoursesControllerTest < ActionController::TestCase
  test 'GET /api/course unauthorized' do
    get :index
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/course success' do
    login_as_testuser
    get :index
    assert_response :ok
    assert_json_match [course_pattern], @response.body
  end

  test 'GET /api/course/:id unauthorized' do
    get :show, params: { id: courses(:testcourse).id }
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/course/:id course not found' do
    login_as_testuser
    get :show, params: { id: 1 }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Course with \'id\'=1'],
                       error_message: 'Course could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/course/:id success' do
    login_as_testuser
    get :show, params: { id: courses(:testcourse).id }
    assert_response :ok
    assert_json_match course_pattern, @response.body
  end

  test 'POST /api/course unauthorized' do
    post :create
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'POST /api/course title defaults to Untitled if not provided' do
    login_as_testuser
    post :create
    assert_response :ok
    pattern = { id: 393749809, title: 'Untitled', instructor_id: 965022582 }
    assert_json_match pattern, @response.body
  end

  test 'DELETE /api/course/:id unauthorized' do
    delete :destroy, params: { id: courses(:testcourse).id }
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'DELETE /api/course/:id forbidden' do
    login_as_seconduser
    delete :destroy, params: { id: courses(:testcourse).id }
    assert_response :forbidden
    error_response = { errors: ['Forbidden'], error_message: 'Forbidden' }
    assert_json_match error_response, @response.body
  end

  test 'DELETE /api/course/:id lesson not found' do
    login_as_testuser
    delete :destroy, params: { id: 1 }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Course with \'id\'=1'],
                       error_message: 'Course could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'DELETE /api/course/:id success' do
    login_as_testuser
    delete :destroy, params: { id: courses(:testcourse).id }
    assert_response :ok
    assert_json_match({ deleted: true }, @response.body)
    assert_raises ActiveRecord::RecordNotFound do
      Course.find(courses(:testcourse).id)
    end
  end

  test 'GET /api/course/:id/lesson unauthorized' do
    get :lessons, params: { id: courses(:testcourse).id }
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/course/:id/lesson course not found' do
    login_as_testuser
    get :lessons, params: { id: 1 }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Course with \'id\'=1'],
                       error_message: 'Course could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/course/:id/lesson success' do
    login_as_testuser
    get :lessons, params: { id: courses(:testcourse).id }
    assert_response :ok
    pattern = [{ id: 318230600, title: 'English 101', course_ids: [393749808] }]
    assert_json_match pattern, @response.body
  end

  test 'PATCH /api/course/:id/lesson unauthorized' do
    patch :add_lesson, params: { id: courses(:testcourse).id }
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'PATCH /api/course/:id/lesson forbidden' do
    login_as_seconduser
    patch :add_lesson, params: { id: courses(:testcourse).id }
    assert_response :forbidden
    error_response = { errors: ['Forbidden'], error_message: 'Forbidden' }
    assert_json_match error_response, @response.body
  end

  test 'PATCH /api/course/:id/lesson course not found' do
    login_as_testuser
    patch :add_lesson, params: { id: 1 }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Course with \'id\'=1'],
                       error_message: 'Course could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'PATCH /api/course/:id/lesson lesson not found' do
    login_as_testuser
    patch :add_lesson, params: { id: courses(:testcourse).id, lesson_id: 1 }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Lesson with \'id\'=1'],
                       error_message: 'Lesson could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'PATCH /api/course/:id/lesson lesson already in course' do
    login_as_testuser
    patch :add_lesson, params: { id: courses(:testcourse).id, lesson_id: lessons(:english101).id }
    assert_response :conflict
    error_response = { errors: ['Lesson already added to this course'],
                       error_message: 'Lesson already added to this course' }
    assert_json_match error_response, @response.body
  end

  test 'PATCH /api/course/:id/lesson add different instructor\'s lesson' do
    login_as_testuser
    patch :add_lesson, params: { id: courses(:testcourse).id, lesson_id: lessons(:english201).id }
    assert_response :conflict
    error_response = { errors: ['Lesson can\'t be added to a different instructor\'s course'],
                       error_message: 'Lesson can\'t be added to a different instructor\'s course' }
    assert_json_match error_response, @response.body
  end

  test 'PATCH /api/course/:id/lesson success' do
    login_as_testuser
    controller = @controller
    @controller = LessonsController.new
    post :create
    lesson_id = JSON.parse(@response.body)['id']
    @controller = controller
    patch :add_lesson, params: { id: courses(:testcourse).id, lesson_id: lesson_id }
    assert_response :ok
    pattern = [{ id: 318230600, title: 'English 101', course_ids: [393749808] },
               { id: 318230601, title: 'Untitled', course_ids: [393749808] }]
    assert_json_match pattern, @response.body
  end

  test 'DELETE /api/course/:id/lesson/:l_id unauthorized' do
    delete :remove_lesson, params: { id: courses(:testcourse).id, l_id: lessons(:english101).id }
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'DELETE /api/course/:id/lesson/:l_id forbidden' do
    login_as_seconduser
    delete :remove_lesson, params: { id: courses(:testcourse).id, l_id: lessons(:english101).id }
    assert_response :forbidden
    error_response = { errors: ['Forbidden'], error_message: 'Forbidden' }
    assert_json_match error_response, @response.body
  end

  test 'DELETE /api/course/:id/lesson/:l_id course not found' do
    login_as_testuser
    delete :remove_lesson, params: { id: 1, l_id: lessons(:english101).id }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Course with \'id\'=1'],
                       error_message: 'Course could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'DELETE /api/course/:id/lesson/:l_id lesson not found' do
    login_as_testuser
    delete :remove_lesson, params: { id: courses(:testcourse).id, l_id: 1 }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Lesson with \'id\'=1'],
                       error_message: 'Lesson could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'DELETE /api/course/:id/lesson/:l_id lesson not in course' do
    login_as_testuser
    delete :remove_lesson, params: { id: courses(:testcourse).id, l_id: lessons(:english201).id }
    assert_response :ok
    pattern = [{ id: 318230600, title: 'English 101', course_ids: [393749808] }]
    assert_json_match pattern, @response.body
  end

  test 'DELETE /api/course/:id/lesson/:l_id success' do
    login_as_testuser
    delete :remove_lesson, params: { id: courses(:testcourse).id, l_id: lessons(:english101).id }
    assert_response :ok
    assert_json_match [], @response.body
    assert_raises ActiveRecord::RecordNotFound do
      CourseLesson.find_by_course_id_and_lesson_id!(
        courses(:testcourse).id,
        lessons(:english101).id
      )
    end
  end

  test 'GET /api/course/:id/student unauthorized' do
    get :students, params: { id: courses(:testcourse).id }
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/course/:id/student course not found' do
    login_as_testuser
    get :students, params: { id: 1 }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Course with \'id\'=1'],
                       error_message: 'Course could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'GET /api/course/:id/student success' do
    login_as_testuser
    get :students, params: { id: courses(:testcourse).id }
    assert_response :ok
    assert_json_match [seconduser_pattern], @response.body
  end

  test 'PATCH /api/course/:id/student unauthorized' do
    patch :add_student, params: { id: courses(:testcourse).id }
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'PATCH /api/course/:id/student forbidden' do
    login_as_seconduser
    patch :add_student, params: { id: courses(:testcourse).id }
    assert_response :forbidden
    error_response = { errors: ['Forbidden'], error_message: 'Forbidden' }
    assert_json_match error_response, @response.body
  end

  test 'PATCH /api/course/:id/student course not found' do
    login_as_testuser
    patch :add_student, params: { id: 1 }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Course with \'id\'=1'],
                       error_message: 'Course could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'PATCH /api/course/:id/student student not found' do
    login_as_testuser
    patch :add_student, params: { id: courses(:testcourse).id, email: '' }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find User'],
                       error_message: 'User could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'PATCH /api/course/:id/student student already in course' do
    login_as_testuser
    patch :add_student, params: { id: courses(:testcourse).id, email: users(:seconduser).email }
    assert_response :conflict
    error_response = { errors: ['Student already added to this course'],
                       error_message: 'Student already added to this course' }
    assert_json_match error_response, @response.body
  end

  test 'PATCH /api/course/:id/student add instructor as student' do
    login_as_testuser
    patch :add_student, params: { id: courses(:testcourse).id, email: users(:testuser).email }
    assert_response :conflict
    error_response = { errors: ['Student can\'t be the same as instructor'],
                       error_message: 'Student can\'t be the same as instructor' }
    assert_json_match error_response, @response.body
  end

  test 'PATCH /api/course/:id/student success' do
    login_as_testuser
    delete :remove_student, params: { id: courses(:testcourse).id, s_id: users(:seconduser).id }
    patch :add_student, params: { id: courses(:testcourse).id, email: users(:seconduser).email }
    assert_response :ok
    assert_json_match [seconduser_pattern], @response.body
  end

  test 'DELETE /api/course/:id/student/:s_id unauthorized' do
    delete :remove_student, params: { id: courses(:testcourse).id, s_id: users(:seconduser).id }
    assert_response :unauthorized
    error_response = { errors: ['Unauthorized'], error_message: 'Unauthorized' }
    assert_json_match error_response, @response.body
  end

  test 'DELETE /api/course/:id/student/:s_id forbidden' do
    login_as_seconduser
    delete :remove_student, params: { id: courses(:testcourse).id, s_id: users(:seconduser).id }
    assert_response :forbidden
    error_response = { errors: ['Forbidden'], error_message: 'Forbidden' }
    assert_json_match error_response, @response.body
  end

  test 'DELETE /api/course/:id/student/:s_id course not found' do
    login_as_testuser
    delete :remove_student, params: { id: 1, s_id: users(:seconduser).id }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find Course with \'id\'=1'],
                       error_message: 'Course could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'DELETE /api/course/:id/student/:s_id student not found' do
    login_as_testuser
    delete :remove_student, params: { id: courses(:testcourse).id, s_id: 1 }
    assert_response :not_found
    error_response = { errors: ['Couldn\'t find User with \'id\'=1'],
                       error_message: 'User could not be found' }
    assert_json_match error_response, @response.body
  end

  test 'DELETE /api/course/:id/student/:s_id student not in course' do
    login_as_testuser
    delete :remove_student, params: { id: courses(:testcourse).id, s_id: users(:testuser).id }
    assert_response :ok
    assert_json_match [seconduser_pattern], @response.body
  end

  test 'DELETE /api/course/:id/student/:s_id success' do
    login_as_testuser
    delete :remove_student, params: { id: courses(:testcourse).id, s_id: users(:seconduser).id }
    assert_response :ok
    assert_json_match [], @response.body
    assert_raises ActiveRecord::RecordNotFound do
      CourseStudent.find_by_course_id_and_student_id!(
        courses(:testcourse).id,
        users(:seconduser).id
      )
    end
  end
end
