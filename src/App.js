import React from 'react'
import styled from 'styled-components'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import { Popup } from './Popup'
import { spacing } from './constants/spacing'

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TopMargin = styled.div`
  margin-top: ${ spacing.unit };
`

const Mono = styled.span`
  font-family: monospace;
`

export class App extends React.Component {
  constructor(props) {
    super(props)

    this.openPopup = this.openPopup.bind(this)
    this.closePopup = this.closePopup.bind(this)
    this.togglePopup = this.togglePopup.bind(this)
    this.toggleEventListener = this.toggleEventListener.bind(this)

    this.state = {
      isPopupOpen: false,
      useDocumentInsteadOfWindow: false,
    }
  }

  componentDidMount() {
    this.hasMounted = true
  }

  componentWillUnmount() {
    this.hasMounted = false

    const { useDocumentInsteadOfWindow } = this.state

    if (useDocumentInsteadOfWindow) {
      document.removeEventListener('click', this.closePopup)
    } else {
      window.removeEventListener('click', this.closePopup)
    }
  }

  openPopup() {
    if (this.hasMounted) {
      const { useDocumentInsteadOfWindow } = this.state

      this.setState({
        isPopupOpen: true,
      })

      if (useDocumentInsteadOfWindow) {
        document.addEventListener('click', this.closePopup)
      } else {
        window.addEventListener('click', this.closePopup)
      }
    }
  }

  closePopup() {
    if (this.hasMounted) {
      const { useDocumentInsteadOfWindow } = this.state

      this.setState({
        isPopupOpen: false,
      })

      if (useDocumentInsteadOfWindow) {
        document.removeEventListener('click', this.closePopup)
      } else {
        window.removeEventListener('click', this.closePopup)
      }
    }
  }

  togglePopup() {
    const { isPopupOpen } = this.state
    if (isPopupOpen) {
      this.closePopup()
    } else {
      this.openPopup()
    }
  }

  toggleEventListener() {
    const currentVal = this.state.useDocumentInsteadOfWindow
    this.setState({
      useDocumentInsteadOfWindow: !currentVal
    })
  }

  render() {
    const { isPopupOpen, useDocumentInsteadOfWindow } = this.state

    const currentClickBinding = useDocumentInsteadOfWindow ? 'DOCUMENT' : 'WINDOW'

    return (
      <Wrapper>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              React Popup Test Case
            </Typography>
          </Toolbar>
        </AppBar>

        <Card>
          <CardContent>
            <Typography variant="subheading" component="h2">
              This is a simple test case demonstrating an interesting bug
              when binding an event listener to close a popup when the user freely
              clicks anywhere on the viewport.
            </Typography>

            <Typography component="p">
              The popup will appear to not display when the event listener to close
              it is bound to the global <Mono>window</Mono>, but will have expected
              behaviour when bound to the global <Mono>document</Mono>.
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <ButtonsWrapper>
              <Button variant="contained" color="primary" onClick={this.togglePopup}>
                Toggle Popup
              </Button>

              <TopMargin>
                <Button variant="contained" color="secondary" onClick={this.toggleEventListener}>
                  Toggle Event Listener between Document and Window
                </Button>

                <Typography component="p">
                  Click event listener for closing the popup currently bound to:
                  <Mono>{currentClickBinding}</Mono>
                </Typography>
              </TopMargin>
            </ButtonsWrapper>
          </CardContent>
        </Card>

        <Popup isOpen={isPopupOpen} />
      </Wrapper>
    )
  }
}
