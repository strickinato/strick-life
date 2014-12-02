# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141201235527) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "friends", force: true do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "friends", ["name"], name: "index_friends_on_name", using: :btree

  create_table "locations", force: true do |t|
    t.float   "latitude",  null: false
    t.float   "longitude", null: false
    t.string  "address"
    t.integer "place_id"
  end

  create_table "posts", force: true do |t|
    t.text     "body"
    t.integer  "user_id",                                     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.date     "post_date",   default: '2014-11-26',          null: false
    t.time     "post_time",   default: '2000-01-01 17:10:46', null: false
    t.integer  "location_id"
  end

  create_table "taggings", force: true do |t|
    t.string   "taggable_type", null: false
    t.integer  "taggable_id",   null: false
    t.integer  "post_id",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "taggings", ["post_id"], name: "index_taggings_on_post_id", using: :btree
  add_index "taggings", ["taggable_id"], name: "index_taggings_on_taggable_id", using: :btree
  add_index "taggings", ["taggable_type"], name: "index_taggings_on_taggable_type", using: :btree

  create_table "tags", force: true do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tags", ["name"], name: "index_tags_on_name", using: :btree

  create_table "users", force: true do |t|
    t.string "email",           null: false
    t.string "password_digest", null: false
    t.string "session_token"
  end

end
