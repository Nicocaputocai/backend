import { useState } from "react";
import "./App.css";
import { Stepper } from "./components/Stepper";
import { StepperControl } from "./components/StepperControl";
import { Address } from "./components/stepts/Address";
import { Ubication } from "./components/stepts/Ubication";
import { LeafPhoto } from "./components/stepts/LeafPhoto";
import { ProfilePhoto } from "./components/stepts/ProfilePhoto";
import { Status } from "./components/stepts/Status";
import { StrepperContext } from "./components/contexts/StepperContext";
import { Finish } from "./components/stepts/Finish";
import { LeafPhotoPlantId } from "./components/stepts/LeafPhotoPlantId";
import { Col, Container, Image, Row } from "react-bootstrap";
const logo = "./arbin-high-resolution-logo-transparent.png";
{
  /* The following line can be included in your src/index.js or App.js file */
}
import "bootstrap/dist/css/bootstrap.min.css";

// const position = [-34.7033363, -58.3953235];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState("");
  const [finalData, setFinalData] = useState([]);
  const [selectPosition, setSelectPosition] = useState(null);
  const [formValid, setFormValid] = useState(false); // Estado para rastrear la validez del formulario
  const [Checkbox, setCheckbox] = useState(null);
  const [fotoHoja, setfotoHoja] = useState(null);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [formStatus, setFormStatus] = useState(null);
  const [position, setPosition] = useState(null);
  const handleShow = () => setShow(true); //Modal de confirmación

  const [finishForm, setFinishForm] = useState({
    idTree: "",
    address: "",
    neightboardhood: "",
    leafImg: null,
    profileImg: null,
    generalStatus: "",
    fallingDanger: "",
    inclination: "",
    diameter: "",
    coordinates: "",
  });

  const handleFormSubmit = (data) => {
    setFormStatus(data);
  };

  const steps = [
    "Dirección",
    "Ubicación",
    "Foto de la hoja",
    "Foto del perfil",
    "Estado",
    "Finalizar",
  ];
  const handleSave = () => {
    save();
  };

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return (
          <Address
            selectPosition={selectPosition}
            setSelectPosition={setSelectPosition}
            handleFormValidityChange={handleFormValidityChange}
          />
        );
      case 2:
        return (
          <Ubication
            selectPosition={selectPosition}
            setSelectPosition={setSelectPosition}
            handleFormValidityChange={handleFormValidityChange}
            position={position}
            setPosition={setPosition}
          />
        );
      case 3:
        return (
          <LeafPhotoPlantId
            handleFormValidityChange={handleFormValidityChange}
            Checkbox={Checkbox}
            setCheckbox={setCheckbox}
            setfotoHoja={setfotoHoja}
            fotoHoja={fotoHoja}
            
          />
        );
      case 4:
        return (
          <ProfilePhoto
            handleFormValidityChange={handleFormValidityChange}
            fotoPerfil={fotoPerfil}
            setFotoPerfil={setFotoPerfil}
          />
        );
      case 5:
        return (
          <Status
            handleFormValidityChange={handleFormValidityChange}
            handleFormSubmit={handleFormSubmit}
          />
        );
      case 6:
        return (
          <Finish
            selectPosition={selectPosition}
            Checkbox={Checkbox}
            fotoHoja={fotoHoja}
            fotoPerfil={fotoPerfil}
            formStatus={formStatus}
            position={position}
            setFinishForm={setFinishForm}
            finishForm={finishForm}
            handleFormValidityChange={handleFormValidityChange}
            formValid={formValid}
          />
        );
    }
  };

  

  const handleClick = (direction) => {
    let newStep = currentStep;

    // Verificar si el usuario intenta avanzar
    if (direction === "Siguiente" && formValid !== false) {
      newStep++;
    } else {
      newStep--;
    }

    // Verificar si se llega al último paso y la dirección es "Siguiente"
    if (currentStep === steps.length && direction === "Siguiente") {
      // Lógica para enviar el formulario
      enviarFormulario(); // Esta es la función para enviar el formulario
    } else {
      // Asegurarse de que el nuevo paso esté dentro del rango de pasos
      if (newStep > 0 && newStep <= steps.length) {
        setCurrentStep(newStep);
      }
    }
  };

  const handleFormValidityChange = (isValid) => {
    setFormValid(isValid);
  };

  return (
    <Container>
      <Image style={{height:'15vh',maxWidth: 'fit-content', marginLeft: 'auto', marginRight:"auto", borderStyle:"inset"}} src={logo}/>
      <Row>
        <div className="mt-5">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
        <Col >
          <div className="my-10">
            {/* Paso el manejador de cambio de validez del formulario a cada paso */}
            <StrepperContext.Provider
              value={{
                userData,
                setUserData,
                finalData,
                setFinalData,
                handleFormValidityChange,
              }}
            >
              {displayStep(currentStep)}
            </StrepperContext.Provider>
          </div>

          <div>
            {/* Deshabilito el botón "Siguiente" si el formulario no es válido */}
            <StepperControl
              handleClick={handleClick}
              currentStep={currentStep}
              steps={steps}
              formValid={formValid}
              save={handleSave}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
