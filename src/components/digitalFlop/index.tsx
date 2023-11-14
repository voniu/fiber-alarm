import { DigitalFlop, Decoration2 } from "@jiaminghi/data-view-react";

function formatter(number: number) {
    const numbers = number.toString().split('').reverse()
    const segs = []

    while (numbers.length) segs.push(numbers.splice(0, 3).join(''))

    return segs.join(',').split('').reverse().join('')
}

const config = {
    number: [22334],
    content: 'Total: {nt}',
    formatter
}


export default function () {
    return <>
        <div className="analysis">Alarm Statistics:</div>
        <div style={{ display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            <DigitalFlop config={config} style={{ height: '36px' }} />
            <Decoration2 style={{ height: '5px' }} />
            <div className="depart_number_box">
                <div>
                    <span className="depart_number_cage" style={{ display: 'inline-block' }}>
                        <div className="depart_name" style={{ textAlign: 'center' }}>First Class Alarms:</div>
                        <div className="depart_number" style={{ textAlign: 'center' }}>3,238</div>
                    </span>
                    <span className="depart_number_cage" style={{ display: 'inline-block' }}>
                        <div className="depart_name" style={{ textAlign: 'center' }}>Second Class Alarms:</div>
                        <div className="depart_number" style={{ textAlign: 'center' }}>1,630</div>
                    </span>
                </div>
                <div>
                    <span className="depart_number_cage" style={{ display: 'inline-block' }}>
                        <div className="depart_name" style={{ textAlign: 'center' }}>Equipment Alarms:</div>
                        <div className="depart_number" style={{ textAlign: 'center' }}>4,251</div>
                    </span>
                    <span className="depart_number_cage" style={{ display: 'inline-block' }}>
                        <div className="depart_name" style={{ textAlign: 'center' }}>System Alarms:</div>
                        <div className="depart_number" style={{ textAlign: 'center' }}>24</div>
                    </span>
                </div>
            </div>
        </div>
    </>
}
