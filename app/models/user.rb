class User < ActiveRecord::Base
  attr_reader :password

  before_validation :ensure_session_token

  validates :email, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :posts


  def self.find_by_credentials(email, password)
    user = self.find_by_email(email)
    user && user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password;
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= generate_random_token
  end

  def generate_random_token
    SecureRandom::urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = generate_random_token
    self.save!
    self.session_token
  end

end
