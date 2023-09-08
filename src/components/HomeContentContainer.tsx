import { IonInput, IonSelect, IonSelectOption } from "@ionic/react";
import "./HomeContentContainer.css";
import { useState } from "react";

export function ContentContainer(){
    return (
        <div className="content_container">
            {/* TODO: check if the metric is already clicked */}
            {/* Dropdown 1 */}
            <IonSelect label="Pilih Metrik" placeholder="Metrik">
                <IonSelectOption value="panjang">Panjang</IonSelectOption>
                <IonSelectOption value="massa">Massa </IonSelectOption>
            </IonSelect>

            {/* TODO: disabled all dropdown and input when no metric is choosen*/}
            <div className="dropdown_container">
                {/* Dropdown 2 */}
                <IonSelect label="Dari" placeholder="--Pilih Satuan" labelPlacement="stacked" disabled={true}>
                    <IonSelectOption value="meter">Meter</IonSelectOption>
                </IonSelect>

                
                {/* Dropdown 3 */}
                <IonSelect label="Ke" placeholder="--Pilih Satuan" labelPlacement="stacked" disabled={true}>
                    <IonSelectOption value="meter">Meter</IonSelectOption>
                </IonSelect>
            </div>

            {/* TODO: set error when the data is not in number */}
            {/* Input */}
            <IonInput 
                label="Input"
                type="number"
                labelPlacement="stacked"
                disabled={true}
            />

            {/* TODO: styling the element */}
            <div style={{
                display: "flex",
                flexDirection: "column"
            }}>

                <p>Hasil</p>
                <p style={{
                    textAlign: "center"
                }}>Value</p>
            </div>
        </div>
    )
}