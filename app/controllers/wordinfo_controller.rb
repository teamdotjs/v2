class WordinfoController < ApplicationController
  # { wordinfo } = { 'id': int, 'word': '', 'definition': '', 'roots': [''], 'forms': [{wordinfo}],
  #                  'synonyms': [''], 'antonyms': [''], sentences: [''] }

  # GET /api/wordinfo/all
  # Desc: return all word infos created by current user
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: { [{ wordinfo }] }
  # Error response:
  #   Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  def all
    render json: { 'wordinfo': 'all' }
  end

  # POST /api/wordinfo/
  # Desc: creates a new word info for the current user
  # Request body params:
  #   word (string)
  #   definition (string - optional)
  #   roots (array of strings - optional)
  #   forms (array of wordinfo - optional)
  #   synonyms (array of strings - optional)
  #   antonyms (array of strings - optional)
  #   sentences (array of strings - optional)
  # Success response:
  #   Code: 200
  #   Content: { wordinfo }
  # Error response:
  #   (1) Code: 400
  #   Content: { 'errors': ['Word not provided'] }
  #   (2) Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  def create
    render json: { 'wordinfo': 'create' }
  end

  # GET /api/wordinfo/:id
  # Desc: return word info specified by id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: { [{ wordinfo }] }
  # Error response:
  #   (1) Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  #   (2) Code: 404
  #   Content: { 'errors': ['Not Found'] }
  def show
    render json: { 'wordinfo': 'show' }
  end

  # PATCH /api/wordinfo/:id
  # Desc: updates word info specified by id
  # Request body params:
  #   word (string - optional)
  #   definition (string - optional)
  #   roots (array of strings - optional)
  #   forms (array of wordinfo - optional)
  #   synonyms (array of strings - optional)
  #   antonyms (array of strings - optional)
  #   sentences (array of strings - optional)
  # Success response:
  #   Code: 200
  #   Content: { wordinfo }
  # Error response:
  #   (1) Code: 400
  #   Content: { 'errors': [''] }
  #   (2) Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  def update
    render json: { 'wordinfo': 'update' }
  end

  # DELETE /api/wordinfo/:id
  # Desc: deletes word info specified by id
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: { 'deleted': true }
  # Error response:
  #   Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  def delete
    render json: { 'wordinfo': 'delete' }
  end
end
