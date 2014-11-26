class AddPostTimeColumn < ActiveRecord::Migration
  def change
    change_column :posts, :post_date, :date, {null: false, default: Date.today()}
    add_column :posts, :post_time, :time, {null: false, default: Time.now()}
  end
end
