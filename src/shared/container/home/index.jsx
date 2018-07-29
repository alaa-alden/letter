/* eslint camelcase:0 */

import React, {
  Component
} from 'react'
import { connect } from 'react-redux'
import { SetGameLevel, SetModleUser } from '../../action'
import styles from './style.scss'

class Home extends Component {
  constructor(props) {
    super(props)
    this.level_1 = this.level_1.bind(this)
    this.level_2 = this.level_2.bind(this)
    this.level_3 = this.level_3.bind(this)
  }
  level_1() {
    // console.log(this)
    // this.props.Set_Modle_User('non')
    this.props.history.push('game')
  }
  level_2() {
    this.props.Set_Game_Level('2')
    this.props.history.push('game')
  }
  level_3() {
    this.props.Set_Game_Level('3')
    this.props.history.push('game')
  }
  render() {
    return (
      <div className={styles.home}>
        <div className={styles.game_levels}>
          <div className={styles.level_1}>
            <button className="btn btn-danger btn-lg btn-block" onClick={this.level_1}>Level 1</button>
          </div>
          <div className={styles.level_2}>
            <button className="btn btn-dark btn-lg btn-block" onClick={this.level_2}>Level 2</button>
          </div>
          <div className={styles.level_3}>
            <button className="btn btn-success btn-lg btn-block" onClick={this.level_3}>Level 3</button>
          </div>
        </div>
        <div className={styles.result}>
          <h1>table</h1>
        </div>
      </div>

    )
  }
}
const mapStateToProps = state => ({
  level: state.reducerGame.level
})
const mapDispatchToProps = dispatch => ({
  Set_Game_Level: (level) => {
    dispatch(SetGameLevel(level))
  },
  Set_Modle_User: (modle) => {
    dispatch(SetModleUser(modle))
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
