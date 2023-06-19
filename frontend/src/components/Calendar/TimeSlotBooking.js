import { useState } from "react";

export const TimeSlotBooking = () => {
  const slots = ["NO SLOT", "FREE", "BOOKED"];
  const colors = ["bg-slot_no", "bg-slot_free", "bg-booked_normal"];
  
  var [count, setCount ] = useState(0)

  if (count > 1){
    count = 0;
  }
  
  
  const sendFreeTime = () =>{
    setCount(count+1)
    
    const data = {
   
      // "type":"setTime",
      // "mail":"ekjfnvjer",
      // "password":"123456",
      // "freeSlots":"[[datetime, datetime], [datetime, datetime], ..., [datetime, datetime]]",
      // "busySlots":"[[datetime, datetime], [datetime, datetime], ..., [datetime, datetime]]"
      
      "type":"log",
      "mail":"ekjfnvjer",
      "password":"123456",
    }

    const postData = async (url = '', data = {}) => {
     
      // Формируем запрос
      const response = await fetch(url, {
        // Метод, если не указывать, будет использоваться GET
        method: 'POST',
        headers: {"Content-type":"application/json",
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers": "content-type",
       },
        // Данные
        body: JSON.stringify(data)
      });
      return response; 
    }
    
   
      postData('https://testing.egorleb.repl.co', data).then((data_) => {
        console.log((data_.json())); 
      });
    
    

}

  if (count == 2){
  return (
    
    <div className="z-20 p-1 border-header_border border-2">
      <div
        onClick={() => {setCount(count+1)}}
        className={`flex pb-20 hover:bg-no_slot_hover hover:cursor-pointer rounded-md z-10 ${colors[count]}`}
      ></div>
      
      </div>
  

    
   
  );}
  else{
    return(
    <div className="z-20 p-1 border-header_border border-2">
      <div
        // onClick={() => {setCount(count+1)}}
        onClick={sendFreeTime}
        className={` pb-20 hover:bg-no_slot_hover hover:cursor-pointer rounded-md z-10 ${colors[count]}`}
      ></div>
    </div>)
  }
};
