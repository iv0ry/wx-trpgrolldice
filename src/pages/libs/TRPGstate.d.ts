

interface Istate {
    /*所有state的唯一标识*/
    name:string
}

export interface TRPGstate extends Istate { 
    value:any
    
} 

// declare const TRPGstate:TRPGstate
// export const TRPGstate:TRPGstate