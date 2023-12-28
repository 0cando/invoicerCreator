/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./App.css";
import "./StylesGeneral.css";

function App() {
  const [ingresoPaola, setIngresoPaola] = useState(0);
  const [comisionPaola, setComisionPaola] = useState(0);
  const [comisionTotalPaola, setComisionTotalPaola] = useState(0);
  const [ingresoLuis, setIngresoLuis] = useState(0);
  const [comisionLuis, setComisionLuis] = useState(0);
  const [comisionTotalLuis, setComisionTotalLuis] = useState(0);

  const [totalDeLuis, setTotalDeLuis] = useState(0);
  const [totalDePaola, setTotalDePaola] = useState(0);

  const [totalDeTodo, setTotalDeTodo] = useState(0);

  const [invoice, setInvoice] = useState("");

  const reiniciarTodo = () => {
    setIngresoPaola(0);
    setComisionPaola(0);
    setComisionTotalPaola(0);
    setIngresoLuis(0);
    setComisionLuis(0);
    setComisionTotalLuis(0);
    setTotalDeLuis(0);
    setTotalDePaola(0);
    setTotalDeTodo(0);
    const invoiceTemp = `
    Dainet's biweekly payment: $${ingresoPaola}
    Dainet's paypal fees: $${comisionTotalPaola}
    Dainet's total: $${totalDePaola}

    Luis' biweekly payment: $${ingresoLuis}
    Luis' paypal fees: $${comisionTotalLuis}
    Luis' total: $${totalDeLuis}

    TOTAL: $${totalDeTodo}`;
    setInvoice(invoiceTemp);

  }

  useEffect(() => {
    const calcularTotales = () => {
      const totalLuis = parseFloat(ingresoLuis) + parseFloat(comisionTotalLuis);
      setTotalDeLuis(totalLuis);

      const totalPaola =
        parseFloat(ingresoPaola) + parseFloat(comisionTotalPaola);
      setTotalDePaola(totalPaola);

      const total = totalLuis + totalPaola;
      setTotalDeTodo(total);
    };

    calcularTotales();
  }, [ingresoLuis, comisionTotalLuis, ingresoPaola, comisionPaola]);

  const hacerCalculos = () => {
    const comisionLuisCalc = (parseFloat(ingresoLuis) * parseFloat(comisionLuis)) / 100;
    setComisionTotalLuis(comisionLuisCalc);

    const comisionPaolaCalc = (parseFloat(ingresoPaola) * parseFloat(comisionPaola)) / 100;
    setComisionTotalPaola(comisionPaolaCalc);
  };

  useEffect(() => {
    const generarInvoice = () => {
      const invoiceTemp = `
        Dainet's biweekly payment: $${ingresoPaola}
        Dainet's paypal fees: $${comisionTotalPaola}
        Dainet's total: $${totalDePaola}

        Luis' biweekly payment: $${ingresoLuis}
        Luis' paypal fees: $${comisionTotalLuis}
        Luis' total: $${totalDeLuis}

        TOTAL: $${totalDeTodo}`;

      setInvoice(invoiceTemp);
    };

    generarInvoice();
  }, [
    ingresoLuis,
    comisionLuis,
    comisionTotalLuis,
    ingresoPaola,
    comisionPaola,
    comisionTotalPaola,
    totalDeLuis,
    totalDePaola,
    totalDeTodo,
  ]);

  return (
    <>
      <div className="Inputs">
        <div className="caja">
          <h4>Ingreso Paola</h4>
          <input
            type="number"
            placeholder="$200"
            value={ingresoPaola}
            onChange={(e) => setIngresoPaola(e.target.value)}
          />
        </div>

        <div className="caja">
          <h4>Fee Paola (%)</h4>
          <input
            type="number"
            placeholder="15"
            value={comisionPaola}
            onChange={(e) => setComisionPaola(e.target.value)}
          />
        </div>

        <div className="caja">
          <h4>Ingreso Luis</h4>
          <input
            type="number"
            placeholder="$200"
            value={ingresoLuis}
            onChange={(e) => setIngresoLuis(e.target.value)}
          />
        </div>

        <div className="caja">
          <h4>Fee Luis (%)</h4>
          <input
            type="number"
            placeholder="15"
            value={comisionLuis}
            onChange={(e) => setComisionLuis(e.target.value)}
          />
        </div>
        <div className="btns">
          <button className="btnInvoice" onClick={hacerCalculos}>
            Generar Invoice
          </button>
          <button className="btnReiniciar" onClick={reiniciarTodo}>
            Reiniciar Todo
          </button>
        </div>
      </div>

      <div className="invoice">
        <textarea rows={10} cols={60} value={invoice}></textarea>
      </div>
    </>
  );
}

export default App;