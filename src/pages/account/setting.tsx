import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { Text, View, Image } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'

import './setting.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  size: number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Setting {
  props: IProps;
}

class Setting extends Component {
  config: Config = {
    navigationBarTitleText: '设置'
  }

  state = {
    size: 0
  }

  componentDidMount() {
    Taro.getStorageInfo({
      success: (res) => {
        if (!res.keys.includes('history')) {
          this.setState({
            size: 0
          })
        } else {
          this.setState({
            size: res.currentSize
          })
        }
      }
    })
  }

  clearHistory() {
    Taro.removeStorage({
      key: 'history'
    }).then(() => {
      Taro.getStorageInfo({
        success: () => {
          this.setState({
            size: 0
          })
        }
      })
    })
  }

  render() {
    return (
      <View className='container' >
        <AtList>
          <AtListItem title='清除历史' extraText={`${this.state.size} KB`} onClick={this.clearHistory} />
        </AtList>
      </View>
    )
  }
}

export default Setting as ComponentClass<PageOwnProps, PageState>
