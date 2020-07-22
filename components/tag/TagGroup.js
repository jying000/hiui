import React, { useCallback, useState, useRef, useEffect } from 'react'
import Tag from './index'
import Icon from '../icon'
import classNames from 'classnames'
import Tooltip from '../tooltip'
const noop = () => { }
const TagGroup = ({
  editable,
  prefixCls = 'hi-tag-group',
  data,
  onAdd = noop,
  onEdit = noop,
  onDelete = noop
}) => {
  const newInputRef = useRef()
  const editInputRef = useRef()
  const tagGroupRef = useRef()
  const editActiveRef = useRef()
  const [newInputValue, setNewInputValue] = useState('')
  const [inputVisible, setInputVisible] = useState(false)
  const [editInputId, setEditInputId] = useState(-1)
  const [editInputValue, setEditInputValue] = useState('')
  const [hoverIndex, setHoverIndex] = useState(-1)

  useEffect(() => {
    if (inputVisible) {
      newInputRef.current.focus()
    }
  }, [
    inputVisible
  ])
  useEffect(() => {
    if (editInputId !== -1) {
      editInputRef.current.focus()
    }
  }, [
    editInputId
  ])
  // 新建 tags
  const handleInputConfirm = useCallback(() => {
    if (newInputValue) {
      onAdd({
        title: newInputValue,
        tagId: new Date().getTime()
      }, data.length)
      setInputVisible(false)
      setNewInputValue('')
    } else {
      setInputVisible(false)
    }
  }, [newInputValue, data])

  // 关闭 tags
  const handleClose = useCallback((tagId) => {
    const index = data.map(item => item.tagId).indexOf(tagId)
    console.log(index)
    if (index !== -1) {
      onDelete(data[index], index)
    }
  }, [data])

  // 展示新建input
  const showInput = useCallback(() => {
    setInputVisible(true)
  }, [])

  // 双击
  const onDoubleClick = useCallback((editInputId, title) => {
    const index = data.map(item => item.tagId).indexOf(editInputId)
    const { width } = tagGroupRef.current.getElementsByClassName('hi-tag')[index].getBoundingClientRect()
    editActiveRef.current = width
    setEditInputId(editInputId)
    setEditInputValue(title)
    setInputVisible(false)
    setNewInputValue('')
    setHoverIndex(-1)
  }, [])

  // 修改
  const handleEditInputConfirm = useCallback((e) => {
    const index = data.map(item => item.tagId).indexOf(editInputId)
    if (editInputValue === '') {
      onEdit(null, index)
    } else {
      onEdit({
        tagId: editInputId,
        title: editInputValue
      }, index)
    }
    setEditInputId(-1)
    setEditInputValue('')
  }, [editInputValue, data])

  // 编辑状态文本框change
  const handleEditInputChange = useCallback((e) => {
    setEditInputValue(e.target.value)
  }, [])

  const renderItem = useCallback((item) => {
    item.isLongTag = item.title.length > 20
    if (editInputId === item.tagId) {
      return <input
        ref={editInputRef}
        key={item.tagId}
        value={editInputValue}
        className={`${prefixCls}-editable--input`}
        style={{ width: editActiveRef.current }}
        onChange={handleEditInputChange}
        onBlur={handleEditInputConfirm}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            handleEditInputConfirm(e)
          }
        }}
      />
    } else {
      return item.isLongTag ? <Tooltip title={item.title} key={item.tagId}>
        {getTag(item)}
      </Tooltip> : getTag(item)
    }
  }, [editInputId, editInputValue, data, hoverIndex])

  // 移入移除 样式
  const onMouseEnter = useCallback((id) => {
    setHoverIndex(id)
  }, [])
  const onMouseLeave = useCallback(() => {
    setHoverIndex(-1)
  }, [])

  const getTag = useCallback((item) => {
    return <Tag key={item.tagId} id={item.tagId} editable={item.editable} closable={item.closable} handleClose={handleClose} onDoubleClick={onDoubleClick} isLongTag={item.isLongTag} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} hoverIndex={hoverIndex}>{item.title}</Tag>
  }, [data, hoverIndex])

  const tagGroupClass = {
    'hi-tag-group-editable': editable
  }

  return <div className={classNames(prefixCls, tagGroupClass)} ref={tagGroupRef}>
    {
      data.map((item) => {
        if (editable) {
          item.editable = item.editable === undefined ? editable : item.editable
          item.closable = item.closable === undefined ? editable : item.closable
        }

        return renderItem(item)
      })
    }
    {
      editable && !inputVisible && <span onClick={() => showInput()} className={`${prefixCls}-editable--plus`}>
        <Icon name='plus' />
      </span>
    }
    {
      editable && inputVisible && <input
        ref={newInputRef}
        type='text'
        value={newInputValue || ''}
        className={`${prefixCls}-editable--input`}
        onChange={(e) => {
          setNewInputValue(e.target.value)
        }}
        onBlur={(e) => handleInputConfirm(e)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            handleInputConfirm(e)
          }
        }}
      />
    }
  </div>
}
export default TagGroup
