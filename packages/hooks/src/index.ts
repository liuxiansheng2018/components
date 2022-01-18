import React, { useState } from 'react'

const useModal = (initialValue:any) => {
  const [modalData, setModalData] = useState(initialValue)

  const closeModal = () => {
    setModalData(initialValue)
  }

  const openModel = (changeValue:any) => {
    setModalData(changeValue)
  }

  return [modalData, closeModal, openModel]
}
export default useModal
