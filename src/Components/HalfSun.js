export default function HalfSun(props) {

  const trimTime = (input) => {
    if( input ){
      let array = input.split('')
      let whereToTrim = array.lastIndexOf(':')  
  
      array.splice(whereToTrim, 3)
      return array.join('')

    }else{
      return('')
    }
  }

  const textOrderDisplay = () => {
    if(props.isSunUp){
      return(
        <>
          <p className='sun-label'>{props.title}</p>
          <h1 className='time-display'>{props.timeDisplay}</h1>
        </>
      )
      }else{
        return(
          <>
            <h1 className='time-display'>{props.timeDisplay}</h1>
            <p className='sun-label'>{props.title}</p>
          </>
        )
      }
    }

    return (
      <div className={props.isSunUp ? 'sun-up' : 'sun-down'}>
        {textOrderDisplay()}
      </div>
    );
}