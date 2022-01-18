import React, { useState, useCallback } from 'react'
import { GetQueryString } from 'src/utils/tools'

interface State {
    current: number,
    size: number,
    total: number
}

const UsePagetions = (api:Function, state:State) => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [pagetions, setpagetions] = useState(state || {
    current: +GetQueryString('current') || 1,
    size: 8,
    total: 0,
  })

  const getData = async(current = pagetions.current, options = {}, formDataCb: Function) => {
    if (!api) return
    setLoading(true)
    let { data: res } = await api({
      ...options,
      current: current,
      size: pagetions.size,
    })

    if (res && res.success && res.data) {
      if (formDataCb) {
        res = formDataCb(res)
      } else {
        setLoading(false)
      }
      setDataSource(res.data.records || [])
      setpagetions({
        total: res.data.total,
        current: current || 1,
        size: 8,
      })
      return res
    } else {
      setDataSource([])
      setLoading(false)
      return null
    }
  }

  return [
    loading,
    pagetions,
    dataSource,
    getData,
    setLoading,
  ]

}

export default UsePagetions
