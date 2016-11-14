class Question < ApplicationRecord
  self.inheritance_column = 'object_type'
  belongs_to :practice
  has_many :prompts, dependent: :destroy
  has_many :options, dependent: :destroy
  accepts_nested_attributes_for :prompts
  accepts_nested_attributes_for :options
  enum type: [:mc, :fitb]
end
