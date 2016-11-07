class WordinfoController < ApplicationController
  # { wordinfo } = {
  #   'id': int,
  #   'word': '',
  #   'definition': '',
  #   'part_of_speech': '',
  #   'roots': [{ 'id': int, 'word': '' }],
  #   'forms': [{ 'id': int, 'word': '', part_of_speech: '' }],
  #   'synonyms': [{ 'id': int, 'word': '' }],
  #   'antonyms': [{ 'id': int, 'word': '' }],
  #   'sentences': [{ 'id': int, 'context_sentence': '' }] }
  before_action :signed_in?

  # GET /api/wordinfo/all
  # Desc: return all word infos created by current user
  # Request body params:
  #   none
  # Success response:
  #   Code: 200
  #   Content: [{ wordinfo }]
  # Error response:
  #   Code: 401
  #   Content: { 'errors': ['Not Authorized'] }
  def all
    render json: Wordinfo.where(user_id: session[:user_id][:value])
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
    render json: Wordinfo.find(params[:id])
  end
end
