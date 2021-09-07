// @flow

import React from 'react'
import type { Node } from 'react'

import styled from 'styled-components/native'

const source = {
  home: require('../img/ic_home.svg'),
  undefined: require('../../img/ic_home.svg'),
  // close: require('../../assets/images/ic_close.svg'),
  // close_white: require('../../assets/images/ic_close_white.svg'),
  // arrow_down: require('../../assets/images/ic_arrow_down.svg'),
  // pairing_successful: require('../../assets/images/ic_pairing_successful.svg'),
  // expand: require('../../assets/images/ic_expand.svg'),
  // device_adjust: require('../../assets/images/ic_device_adjust.svg'),
  // device_adjust_white: require('../../assets/images/ic_device_adjust_white.svg'),
  // device_add: require('../../assets/images/ic_device_add.svg'),
  // device_pause: require('../../assets/images/ic_device_pause.svg'),
  // device_play: require('../../assets/images/ic_device_play.svg'),
  // chevron_right: require('../../assets/images/ic_chevron_right.svg'),
  // chevron_right_white: require('../../assets/images/ic_chevron_right_white.svg'),
  // chevron_left: require('../../assets/images/ic_chevron_left.svg'),
  // chevron_bottom: require('../../assets/images/ic_chevron_bottom.svg'),
  // circle_checked: require('../../assets/images/ic_circle_checked.svg'),
  // circle_unchecked: require('../../assets/images/ic_circle_unchecked.svg'),
  // bright_up: require('../../assets/images/ic_bright_up.svg'),
  // bright_down: require('../../assets/images/ic_bright_down.svg'),
  // device_shutdown: require('../../assets/images/ic_device_shutdown.svg'),
  // device_sleep: require('../../assets/images/ic_device_sleep.svg'),
  // device_reboot: require('../../assets/images/ic_device_reboot.svg'),
  // world: require('../../assets/images/ic_world.svg'),
  // photo: require('../../assets/images/ic_photo.svg'),
  // scan_white: require('../../assets/images/ic_scan_white.svg'),
  // home_gray: require('../../assets/images/ic_home_gray.svg'),
  // plus_square: require('../../assets/images/ic_plus_square.svg'),
  // plus_square_gray: require('../../assets/images/ic_plus_square_gray.svg'),
  // user_circle: require('../../assets/images/ic_user_circle.svg'),
  // user_circle_gray: require('../../assets/images/ic_user_circle_gray.svg'),
  // link: require('../../assets/images/ic_link.svg'),
  // save: require('../../assets/images/ic_save.svg'),
  // save_selected: require('../../assets/images/ic_save_selected.svg'),
  // repost: require('../../assets/images/ic_repost.svg'),
  // repost_selected: require('../../assets/images/ic_repost_selected.svg'),
  // send: require('../../assets/images/ic_send.svg'),
  // send_selected: require('../../assets/images/ic_send_selected.svg'),
  // send_alert: require('../../assets/images/ic_send_alert.svg'),
  // previous_device: require('../../assets/images/ic_previous_device.svg'),
  // next_device: require('../../assets/images/ic_next_device.svg'),
  // check_circle: require('../../assets/images/ic_check_circle.svg'),
  // square: require('../../assets/images/ic_square.svg'),
  // check_square: require('../../assets/images/ic_check_square.svg'),
  // lock: require('../../assets/images/ic_lock.svg'),
  // unlock: require('../../assets/images/ic_unlock.svg'),
  // followings: require('../../assets/images/ic_followings.svg'),
  // settings: require('../../assets/images/ic_settings.svg')
}

function Icons(props): Node {

  const SVG = source[props.name].default
  console.log('--------', SVG)


  const Image = styled(SVG)`
    opacity: ${({ disabled }) => (disabled ? 0.38 : 1)};
  `

  return <Image {...props} />
}

export default Icons
