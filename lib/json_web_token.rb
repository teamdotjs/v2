class JsonWebToken
  def self.encode(payload)
    JWT.encode(payload, Rails.application.secrets.secret_key_base, 'HS256')
  end

  def self.decode(token)
    decoded = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
    return HashWithIndifferentAccess.new(decoded[0])
  rescue
    nil
  end
end
