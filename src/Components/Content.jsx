import React, { useRef } from "react";
import { useState } from "react";
import QRCode from "qrcode";

export default function Content() {
  const [inpt, setInpt] = useState("");
  const [img, setImg] = useState("");
  const [bt, setBt] = useState(true);
  const [btDownload, setbtDownload] = useState("btDownload");
  const canvasRef = useRef();

  const criarQR = () => {
    QRCode.toCanvas(canvasRef.current, inpt, (error) => {
      console.log(error);
    });
    QRCode.toDataURL(inpt, { width: 300, margin: 1 }).then((url) => {
      setImg(url);
    });
    setBt(false);
    setbtDownload("btGerarQR");
    setInpt("");
  };

  return (
    <div className="Content">
      <div className="Text">
        <div className="Box-text">
          <h3>Gerador de QR Code</h3>
          <p>
            Crie rapidamente o seu e transforme a experiência de seus clientes.
            É simples e grátis!
          </p>
        </div>
      </div>
      <div className="Main">
        <div className="Main-Conteudo">
          <label>Insira um Texto/Site</label>
          <input
            type="text"
            onChange={(e) => setInpt(e.target.value)}
            value={inpt}
          />
          <button onClick={criarQR} className="btGerarQR">
            Gerar QR Code
          </button>
          <a href={img} download="QRCode.jpg" disabled="disabled">
            <button
              disabled={bt}
              className={btDownload}
              onClick={() => {
                setbtDownload("btDownload");
              }}
            >
              Baixar QR Code
            </button>
          </a>
          <div className="div-QR">
            <canvas ref={canvasRef} id="canvas"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
