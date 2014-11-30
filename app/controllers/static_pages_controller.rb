class StaticPagesController < ApplicationController
  before_action :require_login

  def root
  end
end
