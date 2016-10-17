class LessonsController < ApplicationController
  # { lesson } = { 'id': int, 'title': '', 'wordinfo': { wordinfo } }
  before_action :signed_in?

  # GET /api/lesson/all
  # Desc: return all lessons created by current user
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: { [{ lesson }] }
  # Error response:
  #   Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  def all
    render json: { 'lesson': 'all' }
  end

  # POST /api/lesson/
  # Desc: creates a new lesson for the current user
  # Request body params:
  #   title (string)
  # Success response:
  #   Code: 200
  #   Content: { lesson }
  # Error response:
  #   (1) Code: 400
  #   Content: { 'errors': ['Title not provided'] }
  #   (2) Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  def create
    render json: { 'lesson': 'create' }
  end

  # GET /api/lesson/:lesson_id/add_word/:word_id
  # Desc: adds a word to a lesson
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: { lesson }
  # Error response:
  #   (1) Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  #   (2) Code: 404
  #   Content: { 'errors': ['Lesson not found'] }
  #   (3) Code: 404
  #   Content: { 'errors': ['Word not found'] }
  def add_word
    render json: { 'lesson': 'add_word' }
  end

  # GET /api/lesson/:lesson_id/remove_word/:word_id
  # Desc: removes a word from a lesson
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: { lesson }
  # Error response:
  #   (1) Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  #   (2) Code: 404
  #   Content: { 'errors': ['Lesson/word pair not found'] }
  def remove_word
    render json: { 'lesson': 'remove_word' }
  end

  # GET /api/lesson/:id
  # Desc: return lesson specified by id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: { [{ lesson }] }
  # Error response:
  #   (1) Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  #   (2) Code: 404
  #   Content: { 'errors': ['Not Found'] }
  def show
    render json: { 'lesson': 'show' }
  end

  # PATCH /api/lesson/:id
  # Desc: updates lesson specified by id
  # Request body params:
  #   title (string)
  # Success response:
  #   Code: 200
  #   Content: { lesson }
  # Error response:
  #   (1) Code: 400
  #   Content: { 'errors': [''] }
  #   (2) Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  def update
    render json: { 'lesson': 'update' }
  end

  # DELETE /api/lesson/:id
  # Desc: deletes lesson specified by id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: { 'deleted': true }
  # Error response:
  #   Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  def delete
    render json: { 'lesson': 'delete' }
  end
end
