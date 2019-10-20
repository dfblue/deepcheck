import React from 'react'
import SectionBar from '../src/content/SectionBar'

export default {
  title: 'SectionBar'
}

const sections = [
  [
    {
      title: 'Alexa Rank',
      value: '#1234',
      highlight: '#E0C812'
    }
  ],
  [
    {
      title: 'Google',
      value: 'Safe',
      highlight: '#12E02A'
    }
  ],
  [
    {
      title: 'Twitter',
      value: '1.4k',
      highlight: '#FF6200'
    },
    {
      title: 'Facebook',
      value: '1.5M',
      highlight: '#12E02A'
    }
  ],
  [
    {
      title: 'Fortune',
      value: '500'
    }
  ]
]

export const checks = () => <SectionBar sections={sections} />

/*

const sections = [
  [
    'Google <span style="color: green">safe</span>'
  ],
  [
    'Twitter 1.4k',
    'Facebook 28M'
  ],
  [
    'Fortune 500'
  ]
]

*/
