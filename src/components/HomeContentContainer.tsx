import { IonIcon, IonInput, IonSelect, IonSelectOption } from "@ionic/react";
import { warning } from "ionicons/icons";
import "./HomeContentContainer.css";
import { useEffect, useState } from "react";


const availableMetric = [
    {
        'name': 'Panjang',
        'units': [{
            'name': 'km',
            'scale': 1, // relative to metric base unit
            'preprocess_value': 0 // value to add or substract before process
        },
        {
            'name': 'hm',
            'scale': 1, 
            'preprocess_value': 0
        },
        {
            'name': 'dam',
            'scale': 1,
            'preprocess_value': 0 
        },
        {
            'name': 'm',
            'scale': 1,
            'preprocess_value': 0
        },
        {
            'name': 'dm',
            'scale': 1,
            'preprocess_value': 0
        },
        {
            'name': 'cm',
            'scale': 1, 
            'preprocess_value': 0 
        },
        {
            'name': 'mm',
            'scale': 1, 
            'preprocess_value': 0 
        }],
        'unit_factor': 10
    },
    {
        'name': 'Massa',
        'units': [{
            'name': 'kg',
            'scale': 1, // relative to metric base unit
            'preprocess_value': 0 // value to add or substract before process
        },
        {
            'name': 'hg',
            'scale': 1, 
            'preprocess_value': 0
        },
        {
            'name': 'dag',
            'scale': 1,
            'preprocess_value': 0 
        },
        {
            'name': 'g',
            'scale': 1,
            'preprocess_value': 0
        },
        {
            'name': 'dg',
            'scale': 1,
            'preprocess_value': 0
        },
        {
            'name': 'cg',
            'scale': 1, 
            'preprocess_value': 0 
        },
        {
            'name': 'mg',
            'scale': 1, 
            'preprocess_value': 0 
        }],
        'unit_factor': 10
    },
    {
        'name': 'Waktu',
        'units': [{
            'name': 'jam',
            'scale': 1, 
            'preprocess_value': 0 
        },
        {
            'name': 'menit',
            'scale': 1, 
            'preprocess_value': 0 
        },
        {
            'name': 'detik',
            'scale': 1, 
            'preprocess_value': 0 
        }],
        'unit_factor': 60
    },
    {
        'name': 'Kuat Arus',
        'units': [{
            'name': 'kA',
            'scale': 1, // relative to metric base unit
            'preprocess_value': 0 // value to add or substract before process
        },
        {
            'name': 'hA',
            'scale': 1, 
            'preprocess_value': 0
        },
        {
            'name': 'daA',
            'scale': 1,
            'preprocess_value': 0 
        },
        {
            'name': 'A',
            'scale': 1,
            'preprocess_value': 0
        },
        {
            'name': 'dA',
            'scale': 1,
            'preprocess_value': 0
        },
        {
            'name': 'cA',
            'scale': 1, 
            'preprocess_value': 0 
        },
        {
            'name': 'mA',
            'scale': 1, 
            'preprocess_value': 0 
        }],
        'unit_factor': 10
    },
    {
        'name': 'Suhu',
        'units': [{
            'name': 'C',
            'scale': 5,
            'preprocess_value': 0
        }, {
            'name': 'R',
            'scale': 4,
            'preprocess_value': 0
        }, {
            'name': 'K',
            'scale': 5,
            'preprocess_value': 273
        }, {
            'name': 'F',
            'scale': 9,
            'preprocess_value': 32
        }],
        'unit_factor': 1
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
                        >{unit.name}</IonSelectOption>
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
    const [isInputDisabled, setInputDisabled] = useState(true)
    const [convertionInfo, setConversionInfo] = useState({
        'selected_metric_index': -1,
        'toIndex': 0,
        'fromIndex': 0,
        'unit_factor': 10,
        'from_unit_preprocess_value': 0,
        'to_unit_preprocess_value': 0,
        'src_unit_scale': 1,
        'dest_unit_scale': 1
    })
    const [inputNumber, setinputNumber] = useState(0)
    const [resultNumber, setResultNumber] = useState(0)
    const [isInvalidInput, setisInvalidInput] = useState(false)

    function handleMetric(event: any){
        for (let metricData of availableMetric){
            if (metricData.name === event.target.value){
                setConversionInfo({
                    ...convertionInfo,
                    'selected_metric_index': availableMetric.indexOf(metricData)
                })
                setInputDisabled(false)
            }
        }
    }

    function handleConvertionFrom(event: any){
        setConversionInfo({
            ...convertionInfo,
            'fromIndex': event.target.value,
            'src_unit_scale': (
                availableMetric
                ?.[convertionInfo?.selected_metric_index]
                ?.units
                ?.[event.target.value]
                ?.scale
            ),
            'from_unit_preprocess_value': (
                availableMetric
                ?.[convertionInfo?.selected_metric_index]
                ?.units
                ?.[event.target.value]
                ?.preprocess_value
            ),
        })
    }

    function handleConvertionTo(event: any){
        setConversionInfo({
            ...convertionInfo,
            'toIndex': event.target.value,
            'dest_unit_scale': (
                availableMetric
                ?.[convertionInfo?.selected_metric_index]
                ?.units
                ?.[event.target.value]
                ?.scale
            ),
            'to_unit_preprocess_value': (
                availableMetric
                ?.[convertionInfo?.selected_metric_index]
                ?.units
                ?.[event.target.value]
                ?.preprocess_value
            ),
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
        if (convertionInfo?.selected_metric_index != -1){
            setInputDisabled(false)
            setConversionInfo({
                ...convertionInfo,
                'unit_factor': availableMetric?.[convertionInfo?.selected_metric_index]?.unit_factor
            })
        }
    }, [convertionInfo?.selected_metric_index])

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
            setResultNumber((
                (
                    (inputNumber - convertionInfo?.from_unit_preprocess_value)
                    * (convertionInfo?.dest_unit_scale / convertionInfo?.src_unit_scale))
                * convertionFactor)
                + convertionInfo?.to_unit_preprocess_value
            )
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
                metricIndex={convertionInfo?.selected_metric_index}
                to_function={handleConvertionTo}
                from_function={handleConvertionFrom}
            />            

            {/* TODO: set error when the data is not in number */}
            <div className="input_container">
            {/* Input */}
                {/* <IonInput 
                    label="Input"
                    type="number"
                    labelPlacement="stacked"
                    onIonChange={handleInputNumber}
                    disabled={isInputDisabled}
                    pattern="[0-9]"
                    className="input_ion"
                    required={true}
                /> */}
                <label htmlFor="input_element">Input</label>
                <input
                    type="number"
                    onChange={handleInputNumber}
                    disabled={isInputDisabled}
                    className="input_ion"
                    required={true}
                    id="input_element"
                    placeholder="123"
                    step="any"
                />
            </div>
            {/* TODO: styling the element */}
            <div style={{
                display: "flex",
                flexDirection: "column",
            }}>

                <p>Hasil</p>
                {   !isInputDisabled && !isInvalidInput && !isNaN(resultNumber) &&
                    <div className="result_container">
                        <p style={{
                            textAlign: "center"
                        }}>
                            {resultNumber}
                        </p>
                        
                    </div>
                }
                {
                    isInvalidInput || isNaN(resultNumber)
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