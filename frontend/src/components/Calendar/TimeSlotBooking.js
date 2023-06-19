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
    
       <div className="group p-1 border-header_border border-2 relative">
        <div
          onClick={() => {
            setCount(count + 1);
          }}
          className={`pb-20 hover:bg-no_slot_hover hover:cursor-pointer rounded-md  ${colors[count]}`}
        ></div>
        <div
          className="flex flex-col justify-center items-center  absolute -top-14 -right-28 group-hover:visible invisible  bg-white border-booked_clicked border-2 py-4 px-10 z-20
      rounded-tl-lg rounded-tr-lg rounded-br-lg text-booked_clicked"
        >
          <p className="z-30">KOSHMANOVA</p>
          <p className="z-30">EKATERINA</p>
          <p className="z-30">8 (910) 165-73-78</p>
        </div>
      </div>
    );

   }
  else{
    return (
      <div className="group p-1 border-header_border border-2 relative">
        <div
          onClick={() => {
            setCount(count + 1);
          }}
          className={`pb-20 hover:bg-no_slot_hover hover:cursor-pointer rounded-md  ${colors[count]}`}
        ></div>
        <div
          className="flex flex-col justify-center items-center  absolute -top-14 -right-28 group-hover:visible invisible  bg-white border-booked_clicked border-2 py-4 px-10 z-20
      rounded-tl-lg rounded-tr-lg rounded-br-lg text-booked_clicked"
        >
          <p className="z-30">KOSHMANOVA</p>
          <p className="z-30">EKATERINA</p>
          <p className="z-30">8 (910) 165-73-78</p>
        </div>
      </div>
    );
  }
};
