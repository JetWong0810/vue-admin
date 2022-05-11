const Style = {}

/**
 * 表格行样式
 */
Style.tableRowStyle = () => {
  const style = {}
  style.height = '10px'
  style.fontSize = '13px'

  return style
}

/**
 * 表格单元格样式
 */
Style.tableCellStyle = () => {
  const style = {}
  style.border = '1px solid rgb(245 245 245)'
  style.borderCollapse = 'collapse'
  style.color = 'black'
  style.padding = '1px 0px'

  return style
}

/**
 * 表头行样式
 */
Style.tableHeaderRowStyle = () => {
  const style = {}
  style.height = '30px!important'
  style.fontSize = '14px'
  style.fontWeight = '900'

  return style
}

/**
 * 表头单元格样式
 */
Style.tableHeaderCellStyle = () => {
  const style = {}
  style.backgroundColor = '#F2F2F2'
  style.border = '1px solid rgb(245 245 245)'
  style.borderCollapse = 'collapse'
  style.fontSize = '14px'

  return style
}

export default Style
