import * as Antd from "antd";
import React, {useEffect, useState} from "react";
import {getSuppliers} from "../services/api";

const SelectSupplier = ({changeSupplierId}) => {

    const [suppliers, setSuppliers] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [supplierId, setSupplierId] = useState();
    useEffect(()=>{
        getSuppliers().then((r) => {
            setSuppliers(r.data.reverse())
        })
    },[])


    const handleSelectSupplier = (key) => {
        setSupplierId(key)
        changeSupplierId(key)
    }
    return (
        <Antd.Form.Item label='Nhà cung cấp' name={'supplierId'} labelCol={{ span: 24 }} rules={[{required: true,message:"Nhà cung cấp không được để trống"}]} >
        <Antd.Select style={{ width: '100%', marginBottom: 10, borderRadius: 5 }} size={'large'}
                         showSearch
                         placeholder="Nhấn để chọn nhà cung cấp"
                         optionFilterProp="children"
                         // defaultValue={supplierId}
                         onChange={handleSelectSupplier}
                         filterOption={(input, option) => (option.children ).includes(input)}
                         filterSort={(optionA, optionB) =>
                             (optionA.children)
                             .toLowerCase()
                             .localeCompare((optionB.children).toLowerCase())
                         }

            >
                {
                    suppliers.map((supplier, index) => {
                        return (
                            <Antd.Select.Option key={supplier.id} value={supplier.id}>

                                {supplier.code+' | '+supplier.name}

                            </Antd.Select.Option>
                        )
                    })
                }
            </Antd.Select>
        </Antd.Form.Item>
    )
}
export default SelectSupplier