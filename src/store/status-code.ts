export const statusCode = ((data: any) => {
   if(data.code==200) {
      message.success('成功')
   }else{
      message.error(data.code+": "+data.msg)
   }
})