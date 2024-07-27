import style from './home.module.css';

export default function Loading() {
  return (
    <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center'}}>
      <svg className={style.loader} height='100%' viewBox='0 0 32 32' width={40}>
        <circle cx='16' cy='16' fill='none' r='14' strokeWidth='4'
          style={{stroke: 'black', opacity: 0.2}}></circle>
        <circle cx='16' cy='16' fill='none' r='14' strokeWidth='4'
          style={{stroke: 'black', strokeDasharray: 80, strokeDashoffset: 60}}></circle>
      </svg>
    </div>
  )
}