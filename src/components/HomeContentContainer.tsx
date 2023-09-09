import { IonIcon, IonInput, IonSelect, IonSelectOption } from "@ionic/react";
import { warning } from "ionicons/icons";
import "./HomeContentContainer.css";
import { useEffect, useState } from "react";


const availableMetric = [
    {
        'name': 'Panjang',
        'units': [
            'km',
            'hm',
            'dam',
            'm',
            'dm',
            'cm',
            'mm'
        ],
        'unit_factor': 10
    },
    {
        'name': 'Massa',
        'units': [
            'kg',
            'hg',
            'dag',
            'g',
            'dg',
            'cg',
            'mg'
        ],
        'unit_factor': 10
    },
    {
        'name': 'Waktu',
        'units': [
            'jam',
            'menit',
            'detik'
        ],
        'unit_factor': 60
    }
]

function SecondRowItemContentContainer({label, isDisabled, placeholder, metricIndex, changeFunction}: 
    {isDisabled: boolean, label: string, placeholder: string, metricIndex: number, changeFunction: any}){
    const selectedUnit = metricIndex !== -1 ? availableMetric[metricIndex].units : null
    
    return (
        <div className="dropdown_input_container">
            <IonSelect 
                label={label} 
                placeholder={placeholder} 
                labelPlacement="stacked" 
                disabled={isDisabled}
                onIonChange={changeFunction}
                className="select_input_ion"
            >
                {selectedUnit && selectedUnit.map(unit => {
                    return (
                        <IonSelectOption
                            value={selectedUnit.indexOf(unit)}
                            key={selectedUnit.indexOf(unit)}
                        >{unit}</IonSelectOption>
                    )
                })}
            </IonSelect>
        </div>
    )
}

function SecondRowContentContainer({to_function, from_function, metricIndex, isDisabled = true}: 
    {to_function: any, from_function: any, isDisabled: boolean, metricIndex: number}){
    return (
        <div className="dropdown_container">
            <SecondRowItemContentContainer
                label="Dari"
                isDisabled={isDisabled}
                placeholder="-- Pilih Satuan"
                metricIndex={metricIndex}
                changeFunction={from_function}
            />

            <SecondRowItemContentContainer
                label="Ke"
                isDisabled={isDisabled}
                placeholder="-- Pilih Satuan"
                metricIndex={metricIndex}
                changeFunction={to_function}
            />
        </div>
    )
}


export function ContentContainer(){
    const [metricIndex, setMetricIndex] = useState(-1)
    const [isInputDisabled, setInputDisabled] = useState(true)
    const [convertionInfo, setConversionInfo] = useState({
        'toIndex': 0,
        'fromIndex': 0,
        'unit_factor': 10
    })
    const [inputNumber, setinputNumber] = useState(0)
    const [resultNumber, setResultNumber] = useState(0)
    const [isInvalidInput, setisInvalidInput] = useState(false)

    function handleMetric(event: any){
        for (let metricData of availableMetric){
            if (metricData.name === event.target.value){
                setMetricIndex(availableMetric.indexOf(metricData))
                setInputDisabled(false)
            }
        }
    }

    function handleConvertionFrom(event: any){
        setConversionInfo({
            ...convertionInfo,
            'fromIndex': event.target.value
        })
    }

    function handleConvertionTo(event: any){
        setConversionInfo({
            ...convertionInfo,
            'toIndex': event.target.value
        })
    }

    function handleInputNumber(event: any){
        const input_value = parseFloat(event.target.value)
        if (!isNaN(input_value)){
            setisInvalidInput(false)
            setinputNumber(input_value)
        }
        else {
            setinputNumber(-1)
            setisInvalidInput(true)
        }
    }

    useEffect(() => {
        if (metricIndex != -1){
            setInputDisabled(false)
            setConversionInfo({
                ...convertionInfo,
                'unit_factor': availableMetric[metricIndex]?.unit_factor
            })
        }
    }, [metricIndex])

    useEffect(() => {
        console.log(convertionInfo)
    }, [convertionInfo])

    useEffect(() =>{
        if (convertionInfo?.toIndex === convertionInfo?.fromIndex){
            setResultNumber(inputNumber)
        }
        else {
            // count based of how many 'stair' space between the index
            const convertionFactor = (convertionInfo?.unit_factor) ** (convertionInfo?.toIndex - convertionInfo?.fromIndex)
            setResultNumber(inputNumber * convertionFactor)
        }
    }, [convertionInfo, inputNumber])

    return (
        <div className="content_container">
            <div>
                {/* TODO: check if the metric is already clicked */}
                {/* Dropdown 1 */}
                <IonSelect 
                    label="Pilih Metrik" 
                    placeholder="Metrik" 
                    onIonChange={handleMetric}
                >
                    {availableMetric.map( metric => {
                        return (
                            <IonSelectOption 
                                value={metric.name} 
                                key={availableMetric.indexOf(metric)}>
                                {metric.name}
                            </IonSelectOption>
                        )
                    })}
                </IonSelect>
            </div>

            <SecondRowContentContainer 
                isDisabled={isInputDisabled} 
                metricIndex={metricIndex}
                to_function={handleConvertionTo}
                from_function={handleConvertionFrom}
            />            

            {/* TODO: set error when the data is not in number */}
            <div className="input_container">
            {/* Input */}
                <IonInput 
                    label="Input"
                    type="number"
                    labelPlacement="stacked"
                    onIonChange={handleInputNumber}
                    disabled={isInputDisabled}
                    pattern="[0-9]"
                    className="input_ion"
                    required={true}
                />
            </div>
            {/* TODO: styling the element */}
            <div style={{
                display: "flex",
                flexDirection: "column",
            }}>

                <p>Hasil</p>
                {   !isInputDisabled && !isInvalidInput &&
                    <div className="result_container">
                        <p style={{
                            textAlign: "center"
                        }}>
                            {resultNumber}
                        </p>
                        
                    </div>
                }
                {
                    isInvalidInput 
                    && (
                        <div className="error_container">
                            <div>
                                <IonIcon icon={warning} color="#FFFF00"/>
                            </div>
                            <div>
                                <p>Error, input bukan dalam bentuk angka</p>
                            </div>
                        </div>
                    )

                }
            </div>
        </div>
    )
}