require 'date'

class User < ApplicationRecord
  before_save { self.email = email.downcase }
  validates :name, presence: true
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true,
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  has_secure_password
  validates :password, length: { minimum: 6 }
  validate :birthday_present_and_humanly

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
