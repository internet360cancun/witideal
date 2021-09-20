import React, { Component } from 'react';
import { MultiSelectButtons } from '../MultiSelectButtons/multiSelectButtons';
import { GenderProperties } from '../GenderProperties/genderProperties';
import { Dropdown } from '../Dropdown/dropdown';
import { InputPrice } from '../InputPrice/inputPrice';

export class FormPromoter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            offset: this.props.offset,
            offsetElems: this.props.offsetElems,
            cols: this.props.cols,
            transactions: ['COMPRAR', 'RENTAR', 'TRASPASO', 'PREVENTA'],
            habitational: ['Casa Sola', 'Casa en Condominio', 'Departamento', 'Desarrollo', 'Edificio', 'Terreno'],
            comercial: ['Desarrollo', 'Edificio', 'Local', 'Oficina', 'Terreno', 'Bodega'],
            actualGender: ['Casa Sola', 'Casa en Condominio', 'Departamento', 'Desarrollo', 'Edificio', 'Terreno'],
            currency: ['MXN', 'USD']
        }

        this.habToCom = this.habToCom.bind(this);
        this.comToHab = this.comToHab.bind(this);
    }

    habToCom() {
        this.setState({
            actualGender: this.state.comercial
        })
    }

    comToHab() {
        this.setState({
            actualGender: this.state.habitational
        })
    }


    render() {
        return (
            <div className={`col-md-${this.state.cols}`}>
                <form>
                    <div className="row">
                        <MultiSelectButtons
                            ctaction = "Determina el tipo de Operación"
                            transactions={this.state.transactions}
                            cols={10}
                            offset={this.state.offsetElems}
                            br="form-user-br"
                            id="operation"
                        />
                    </div>


                    <div className="row">

                        <GenderProperties
                            habToCom={this.habToCom}
                            comToHab={this.comToHab}
                            offset={this.state.offsetElems +1}
                            cols={4}
                            br="form-user-br"
                        />

                        <Dropdown
                            type={this.state.actualGender}
                            cols={3}
                            label={true}
                            br="form-user-br"
                        />
                    </div>

                    <div className="row">
                        <div className={`offset-md-${this.state.offsetElems}`}></div>
                        {/* <Sliderselector/> */}
                        <InputPrice
                            label="¿Cúal es el costo del Inmueble?"
                            cols={3}
                            offset={2}
                            br="form-user-br"
                        />
                        <MultiSelectButtons
                            transactions={this.state.currency}
                            cols={2}
                            br="form-user-br"
                            id="currency"
                        />
                    </div>

                    <div className="row">
                        <div className={`offset-md-${this.state.offsetElems + 4}`} />{/* blank column for design in grid*/}
                        <button type="submit" className="btn btn-primary col-md-3 submitBtn">Datos Específicos ></button>
                    </div>
                </form>
            </div>
        )
    }
}
