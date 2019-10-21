import React from 'react'
import Bar from '../src/content/Bar'

export default {
  title: 'Bar'
}

const sections = [
  [
    { title: 'Web Rank', value: '#2727630', highlight: '#12E0C6' }
  ],
  [
    { title: 'Registered', value: 'Jul 17, 2019' }
  ],
  [
    { title: 'Google', value: 'Safe', highlight: '#12E02A' }
  ],
  [
    { title: 'Twitter', value: '@dfblue' },
    { title: 'Followers', value: '38' },
    { title: 'Tweets', value: '50' }
  ]
]

export const checks = () => <Bar sections={sections} />
