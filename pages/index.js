import React, { Component } from 'react'
import { string } from 'prop-types'
import firebase from 'firebase'
import Head from 'next/head'
import clientCredentials from '../credentials/client'

class Index extends Component {
  static async getInitialProps({ req }) {
    const snap = await req.firebaseServer
      .database()
      .ref('candaddyplay')
      .once('value')
    const candaddyplay = snap && snap.val()
    return { candaddyplay }
  }

  constructor(props) {
    super(props)
    this.state = {
      candaddyplay: this.props.candaddyplay
    }
  }

  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(clientCredentials)
    }

    this.addDbListener()
  }

  render() {
    const { candaddyplay } = this.state

    return (
      <div className={`wrapper wrapper--${candaddyplay}`}>
        <Head>
          <title>Can Daddy Play Minecraft</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />

          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css"
          />
        </Head>
        <div>
          <h1>Can Daddy play Minecraft?</h1>
          <h2 className="blink">{candaddyplay}</h2>
        </div>
        <style jsx global>{`
          html, body, .wrapper, #__next { height: 100%; }
          body { font-family: sans-serif; text-align: center; }
          .wrapper { display: flex; justify-content: center; align-items: center; }
          .wrapper--yes { background-color: #65AC3C; }
          .wrapper--no { background-color: #A30A17; }
          .wrapper--yes .blink {
            animation: blink-animation 1s steps(5, start) infinite;
            -webkit-animation: blink-animation 1s steps(5, start) infinite;
          }
          @keyframes blink-animation {
            to {
              visibility: hidden;
            }
          }
          @-webkit-keyframes blink-animation {
            to {
              visibility: hidden;
            }
          }
        `}
        </style>
        <style jsx>{`
            h1 { color: white }
            h2 { color: white; text-transform: uppercase; }
          `}
        </style>
      </div>
    )
  }

  addDbListener = () => {
    firebase
      .database()
      .ref('candaddyplay')
      .on('value', snap => {
        const candaddyplay = snap.val()
        if (candaddyplay) this.setState({ candaddyplay })
      })
  }
}

Index.defaultProps = {
  candaddyplay: 'yes'
}

Index.propTypes = {
  candaddyplay: string
}

export default Index