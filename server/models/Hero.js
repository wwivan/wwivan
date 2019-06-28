const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  title: {
    type: String
  },
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category"
  }],
  score: {
    difficult: {
      type: Number
    },
    skills: {
      type: Number
    },
    attack: {
      type: Number
    },
    survive: {
      type: Number
    },
  },
  skins: [{
    name: {
      type: String
    },
    skin: {
      type: String
    }
  }],
  skills: [{
    icon: {
      type: String
    },
    name: {
      type: String
    },
    description: {
      type: String
    },
    tips: {
      type: String
    }
  }],
  items1: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Item'
  }],
  items2: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Item'
  }],

  usageTips: {
    type: String
  },
  battleTips: {
    type: String
  },
  teamTips: {
    type: String
  },
  partners: [{
    hero: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Hero'
    },
    description: {
      type: String
    }
  }]
})

try { //解决重复定义的问题
  module.exports = mongoose.model('Hero', schema, 'heroes')
} catch (e) {
  if (e.name === 'OverwriteModelError') {
    module.exports = mongoose.model('Hero')
  }
}