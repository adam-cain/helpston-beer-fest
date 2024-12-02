import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

function App() {
  return (
    <>
      <div className="absolute z-10 w-full h-full flex justify-center items-center text-center p-4">
        <div className=" p-6">
          <h1 className="text-xl md:text-5xl font-semibold text-white mb-4">
            Helpston Beer Festival
          </h1>
          <p className="text-lg md:text-xl font-light text-white">
            We're brewing something special 🍻 Stay tuned!
          </p>
        </div>
      </div>
      <ShaderGradientCanvas
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <ShaderGradient
          control="query"
          urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=0.7&cAzimuthAngle=180&cDistance=2.4&cPolarAngle=95&cameraZoom=1&color1=%23fef3ad&color2=%23FEC749&color3=%23fed370&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=-2.1&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=225&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.8&uFrequency=5.5&uSpeed=0.2&uStrength=3&uTime=0.2&wireframe=false"
        />
      </ShaderGradientCanvas>
    </>
  );
}

export default App;
