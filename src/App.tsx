import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

// Определение типов
interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[]; //// Не используется
}

interface Props {
  params: Param[];
  model: Model;
}

interface ParamEditorRef {
  getModel: () => Model;
}

// Интерфейс цвета неявно задан, поскольку не используется в описании ТЗ
interface Color {
  id: number;
  name: string;
}

// Компонент для редактирования параметра
const ParamInput: React.FC<{
  param: Param
  value: string
  onChange: (paramId: number, value: string) => void
}> = ({ param, value, onChange }) => {
  return (
    <div style={{ 
      marginBottom: '16px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px',
      justifyContent: 'space-between' }}>
      <label style={{ display: 'block', fontWeight: '500' }}>
        {param.name}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(param.id, e.target.value)}
        style={{
          width: '15rem',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
    </div>
  )
}

// Редактор параметров 
const ParamEditor = forwardRef<ParamEditorRef, Props>(
  ({ params, model }, ref) => {
    const [paramValues, setParamValues] = useState<ParamValue[]>(
      model.paramValues || []
    )

    // обновление значения параметра
    const handleParamChange = (paramId: number, value: string) => {
      setParamValues((prev) => {
        const existingIndex = prev.findIndex((pv) => pv.paramId === paramId)

        if (existingIndex >= 0) {
          const updated = [...prev]
          updated[existingIndex] = { paramId, value }
          return updated;
        } else {
          return [ ...prev, { paramId, value}]
        }
      })
    }

    // Получение текущего значения параметра
    const getParamValue = (paramId: number ) => {
      return paramValues.find((pv) => pv.paramId === paramId)?.value || ''
    }

    // Публикуем метод getModel через ref
    useImperativeHandle(ref, () => ({
      getModel: () => ({
        ...model,
        paramValues,
      })
    }))

    return (
      <div style={{ maxWidth: '400px'}}>
        {params.map((param) => (
          <ParamInput
            key={param.id}
            param={param}
            value={getParamValue(param.id)}
            onChange={handleParamChange}
          />
        ))}
      </div>
    )
  }
)

// Пример + кнопка для вывод модели
const App: React.FC = () => {
  const params: Param[] = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' }
  ]

  const initialModel: Model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' }
    ],
    colors: [],
  }

  const paramEditorRef = useRef<ParamEditorRef>(null)

  const handleGetModel = () => {
    const currentModel = paramEditorRef.current?.getModel()
    console.log('Current model:', currentModel)
    alert(JSON.stringify(currentModel, null, 2))
  }

  return (
    <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif'}}>
      <h1 style={{ marginBottom: '24px'}}>Редактор параметров</h1>
      <ParamEditor ref={paramEditorRef} params={params} model={initialModel}/>
      <button
        onClick={handleGetModel}
        style={{
          marginTop: '16px',
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Получить модель
      </button>
    </div>
  )
}

export default App