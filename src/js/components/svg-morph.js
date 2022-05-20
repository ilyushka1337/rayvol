import { interpolate } from 'polymorph-js';
import { animate } from 'just-animate'


function stainAnimation(){
   const svgMorph = (left, right) => {
      return interpolate([left, right], { 
         precision: 2,
         origin: {
            x: 6,
            y: 14,
            absolute: true
         }
      })
   }
   const t1 = animate({
      targets: '.stain__icon path',
      duration: 9000,
      props: {
         d: {
            interpolate: svgMorph,
            easing: 'cubic-bezier(.5,0,.5,1)',
            value: [
               '#stain1 path', 
               '#stain2 path',
               '#stain3 path',
            ]
         }
      }
   })
   t1.play({
      alternate: true,
      destroy: false,
      repeat: Infinity
   })
}
stainAnimation()