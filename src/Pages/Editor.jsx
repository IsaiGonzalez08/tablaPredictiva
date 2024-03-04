import CodeMirror from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import { validateExpression } from "../utils/index";


const Editor = () => {
    const [validation, setValidation] = useState(null);

    const handleChange = useCallback((value) => {
        const result = validateExpression(value);
        setValidation(result);
    }, []);

    return (
        <>
            <div className="flex justify-center items-center w-full h-screen gap-20 bg-base-200">
                <div className="flex flex-col">
                    <CodeMirror
                        height="400px"
                        width="700px"
                        theme="dark"
                        value=''
                        onChange={handleChange}
                        className="py-2 static flex items-center"
                    />

                    {validation && (
                        <div className={`bg-${validation.esValida ? "green" : "red"}-100 text-sky-700 p-4 mt-4 rounded-md shadow-md overflow-y-scroll h-80 `}>
                            <p className="text-center font-bold text-2xl">
                                {validation.esValida
                                    ? "Cadena correcta"
                                    : `Cadena incorrecta: ${validation.reportarError}`}
                            </p>
                            {validation.infostack.map((item, index) => (
                                <div key={index} className="mt-2 font-semibold">{item}</div>
                            ))}
                        </div>
                    )}

                </div>

                <div className="flex flex-col items-center gap-10">
                    <h1 className="text-4xl font-bold">Gramática 5 Tabla Predictiva</h1>
                    <div className="mockup-code bg-primary text-primary-content">
                        <pre data-prefix=">"><code>Repetitiva {"->"} mientras CONDICIONAL</code></pre>
                        <pre data-prefix=">"><code>CONDICIONAL {"->"} (EXPRESIONES OPCIONAL)</code></pre>
                        <pre data-prefix=">"><code>EXPRESIONES {"->"} VALOR OPERADOR VALOR</code></pre>
                        <pre data-prefix=">"><code>VALOR {"->"} LETRA RESTO</code></pre>
                        <pre data-prefix=">"><code>RESTO {"->"} LETRA RESTO</code></pre>
                        <pre data-prefix=">"><code>RESTO {"->"} a..z</code></pre>
                        <pre data-prefix=">"><code>LETRA {"->"} a..z</code></pre>
                        <pre data-prefix=">"><code>OPERADOR {"-> < | > | == | != | <= | >="}</code></pre>
                        <pre data-prefix=">"><code>OPCIONAL {"->"} LOGICO EXPRESIONES</code></pre>
                        <pre data-prefix=">"><code>OPCIONAL {"->"} ''</code></pre>
                        <pre data-prefix=">"><code>LOGICO{"->"} or | and</code></pre>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Editor