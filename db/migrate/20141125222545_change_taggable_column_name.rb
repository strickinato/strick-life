class ChangeTaggableColumnName < ActiveRecord::Migration
  def change
    rename_column :taggings, :tagging_id, :taggable_id
    rename_column :taggings, :type, :taggable_type
  end
end
