class Root < ApplicationRecord
  belongs_to :wordinfo
  validates :root, presence: true, length: { maximum: 255 }
  validates :meaning, length: { maximum: 255 }
  validates_uniqueness_of :root, scope: :wordinfo, case_sensitive: false
end
