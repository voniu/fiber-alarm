import { DigitalFlop, Decoration2 } from "@jiaminghi/data-view-react";

function formatter(number: number) {
    const numbers = number.toString().split('').reverse()
    const segs = []

    while (numbers.length) segs.push(numbers.splice(0, 3).join(''))

    return segs.join(',').split('').reverse().join('')
}

const config = {
    number: [22334],
    content: '总量：{nt}',
    formatter
}


export default function () {
    return <>
        <div className="analysis">报警统计：</div>
        <div style={{ display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            <DigitalFlop config={config} style={{ height: '36px' }} />
            <Decoration2 style={{ height: '5px' }} />
            <div className="depart_number_box">
                <ul className="depart_number_cage">
                    <li className="depart_name">一级报警：</li>
                    <li className="depart_number">3,238</li>
                </ul>
                <ul className="depart_number_cage">
                    <li className="depart_name">二级报警：</li>
                    <li className="depart_number">1,630</li>
                </ul>
                <ul className="depart_number_cage" style={{ marginBottom: 0 }}>
                    <li className="depart_name">设备报警：</li>
                    <li className="depart_number">4,251</li>
                </ul>
                <ul className="depart_number_cage" style={{ marginBottom: 0 }}>
                    <li className="depart_name">系统报警：</li>
                    <li className="depart_number">24</li>
                </ul>
            </div>
        </div>
    </>
}
