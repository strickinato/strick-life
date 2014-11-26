class AddPublishForColumn < ActiveRecord::Migration
  def change
    add_column :posts, :post_date, :datetime, {null: false, default: DateTime.now()}
  end
end
