class Question < ApplicationRecord
  self.inheritance_column = 'object_type'
  belongs_to :practice
  has_many :prompts, inverse_of: :question, dependent: :destroy
  has_many :options, inverse_of: :question, dependent: :destroy
  has_many :grades, dependent: :destroy
  accepts_nested_attributes_for :prompts
  accepts_nested_attributes_for :options
  enum type: [:mc, :fitb]
  validates :type, presence: true
end
