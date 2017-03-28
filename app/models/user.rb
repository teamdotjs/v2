require 'date'

class User < ApplicationRecord
  has_many :wordinfos
  has_many :lessons, foreign_key: 'owner_id'
  has_many :course_students, dependent: :destroy, foreign_key: 'student_id'
  has_many :courses, through: :course_students
  has_many :grades, dependent: :destroy
  before_save { self.email = email.downcase }
  validates :name, presence: true
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true,
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  has_secure_password
  validates :password, length: { minimum: 6 }, on: :create
  validate :birthday_present_and_humanly

  def as_json(options = {})
    user =
      if options.empty? then super({
        except: [:password_digest, :created_at, :updated_at]
      })
      else super(options)
      end
    birthday = user['birthday']
    user['birthday'] = birthday.to_s if birthday
    user
  end

  private

  def birthday_present_and_humanly
    if !birthday.present?
      errors.add(:birthday, 'can\'t be blank')
    elsif birthday >= Date.today
      errors.add(:birthday, 'can\'t be today or in the future')
    elsif birthday.year < 1900
      errors.add(:birthday, 'can\'t be earlier than 1900')
    end
  end
end
