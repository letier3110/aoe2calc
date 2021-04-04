import { useState } from 'react'
import s from './App.module.css'

const initialState = {
  iFarmersCount: 0,
  iForagersCount: 0,
  iHuntersCount: 0,
  iShepherdsCount: 0,
  iFishermansCount: 0,
  iLumberjackCount: 0,
  iMinersCount: 0,
  iStoneCollectorsCount: 0,
  //wood upgrades
  DoubleAxeMod: 1,
  BowSawMod: 1,
  TwoManSawMod: 1,
  //gold upgrades
  GoldMiningMod: 1,
  GoldShaftMiningMod: 1,
  //stone upgrades
  StoneMiningMod: 1,
  StoneShaftMiningMod: 1,
  //carts
  WheelbarrowMod: 1,
  HandCartMod: 1,
  //Farms update
  HorseCollarMod: 0,
  HeavyPlowMod: 0,
  CropRotationMod: 0
}

const BaseFarmerGatheringRate = 0.32
const BaseFishermanGatheringRate = 0.43
const BaseHunterGatheringRate = 0.41
const BaseLumberjackGatheringRate = 0.39
const BaseGoldMinerGatheringRate = 0.38
const BaseStoneMinerGatheringRate = 0.36
const BaseShepherdMinerGatheringRate = 0.33
const BaseForagerMinerGatheringRate = 0.31
//walking factor
const ForagerWalkingFactor = 1
const HunterWalkingFactor = 1
const ShepherdWalkingFactor = 1
const FishermanWalkingFactor = 1
// const LumberjackWalkingFactor = 1
// const AllMinerWalkingFactor = 1
//FarmsData
const FarmBaseFoodAmount = 175
const FarmBaseBuildingTime = 15
const FarmBaseCost = 60

const App = () => {
  const [state, setState] = useState(initialState)
  const {
    iFarmersCount,
    iForagersCount,
    iHuntersCount,
    iShepherdsCount,
    iFishermansCount,
    iLumberjackCount,
    iMinersCount,
    iStoneCollectorsCount,
    //wood upgrades
    DoubleAxeMod,
    BowSawMod,
    TwoManSawMod,
    //gold upgrades
    GoldMiningMod,
    GoldShaftMiningMod,
    //stone upgrades
    StoneMiningMod,
    StoneShaftMiningMod,
    //carts
    WheelbarrowMod,
    HandCartMod,
    //Farms update
    HorseCollarMod,
    HeavyPlowMod,
    CropRotationMod
  } = state

  const DoubleBitAxe_CheckedChanged = e => handleChangeCheck(e.target.name, !e.target.checked ? 1 : 1.2)
  const BowSaw_CheckedChanged = e => handleChangeCheck(e.target.name, !e.target.checked ? 1 : 1.2)
  const TwoManSaw_CheckedChanged = e => handleChangeCheck(e.target.name, !e.target.checked ? 1 : 1.1)
  const GoldMining_CheckedChanged = e => handleChangeCheck(e.target.name, !e.target.checked ? 1 : 1.15)
  const GoldShaftMining_CheckedChanged = e => handleChangeCheck(e.target.name, !e.target.checked ? 1 : 1.15)
  const StoneMining_CheckedChanged = e => handleChangeCheck(e.target.name, !e.target.checked ? 1 : 1.15)
  const StoneShaftMining_CheckedChanged = e => handleChangeCheck(e.target.name, !e.target.checked ? 1 : 1.15)
  // const Wheelbarrow_CheckedChanged = e => {}
  // const HandCart_CheckedChanged = e => {}
  const HorseCollar_CheckedChanged = e => handleChangeCheck(e.target.name, 75)
  const HeavyPlow_CheckedChanged = e => handleChangeCheck(e.target.name, 125)
  const CropRotation_CheckedChanged = e => handleChangeCheck(e.target.name, 175)

  //calculations
  let CalculatedFarmProductionRate = BaseFarmerGatheringRate * WheelbarrowMod * HandCartMod
  CalculatedFarmProductionRate = CalculatedFarmProductionRate > 0.44 ? 0.44 : CalculatedFarmProductionRate
  const CalculatedFoodRate =
    iFarmersCount * CalculatedFarmProductionRate +
    iForagersCount * BaseForagerMinerGatheringRate * WheelbarrowMod * HandCartMod * ForagerWalkingFactor +
    iHuntersCount * BaseHunterGatheringRate * WheelbarrowMod * HandCartMod * HunterWalkingFactor +
    iShepherdsCount * BaseShepherdMinerGatheringRate * WheelbarrowMod * HandCartMod * ShepherdWalkingFactor +
    iFishermansCount * BaseFishermanGatheringRate * WheelbarrowMod * HandCartMod * FishermanWalkingFactor
  const CalculatedWoodRate =
    iLumberjackCount *
    BaseLumberjackGatheringRate *
    DoubleAxeMod *
    BowSawMod *
    TwoManSawMod *
    WheelbarrowMod *
    HandCartMod
  const CalculatedGoldRate =
    iMinersCount * BaseGoldMinerGatheringRate * GoldMiningMod * GoldShaftMiningMod * WheelbarrowMod * HandCartMod
  const CalculatedStoneRate =
    iStoneCollectorsCount *
    BaseStoneMinerGatheringRate *
    StoneMiningMod *
    StoneShaftMiningMod *
    WheelbarrowMod *
    HandCartMod
  // FoodCount.Text = (CalculatedFoodRate * 60).ToString()
  // WoodCount.Text = (CalculatedWoodRate * 60).ToString()
  // GoldCount.Text = (CalculatedGoldRate * 60).ToString()
  // StoneCount.Text = (CalculatedStoneRate * 60).ToString()
  const FarmFoodAmount = FarmBaseFoodAmount + HorseCollarMod + HeavyPlowMod + CropRotationMod
  const FarmLivingTime = FarmFoodAmount / CalculatedFarmProductionRate + FarmBaseBuildingTime
  const FarmWoodCostRate = FarmBaseCost * iFarmersCount * (60 / FarmLivingTime)
  const handleChange = e => setState({ ...state, [e.target.name]: e.target.value })
  const handleChangeCheck = (n, v) => setState({ ...state, [n]: v })
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.bodyHeader}>Рейты</div>
        <div className={s.flex}>
          <div className={s.flex1}>
            <div className={s.bodyRow}>
              <input value={iFarmersCount} name='iFarmersCount' onChange={handleChange} />
              <div>фермеров</div>
            </div>
            <div className={s.bodyRow}>
              <input value={iForagersCount} name='iForagersCount' onChange={handleChange} />
              <div>фуражиров</div>
            </div>
            <div className={s.bodyRow}>
              <input value={iHuntersCount} name='iHuntersCount' onChange={handleChange} />
              <div>охотников</div>
            </div>
            <div className={s.bodyRow}>
              <input value={iShepherdsCount} name='iShepherdsCount' onChange={handleChange} />
              <div>пастухов</div>
            </div>
            <div className={s.bodyRow}>
              <input value={iFishermansCount} name='iFishermansCount' onChange={handleChange} />
              <div>рыбаков</div>
            </div>
            <div className={s.bodyRow}>
              <input value={iLumberjackCount} name='iLumberjackCount' onChange={handleChange} />
              <div>дровосеков</div>
            </div>
            <div className={s.bodyRow}>
              <input value={iMinersCount} name='iMinersCount' onChange={handleChange} />
              <div>золотодобытчиков</div>
            </div>
            <div className={s.bodyRow}>
              <input value={iStoneCollectorsCount} name='iStoneCollectorsCount' onChange={handleChange} />
              <div>горняков</div>
            </div>
          </div>
          <div className={s.flex2}>
            <div className={s.flexRow}>
              <div className={s.bodyRow}>
                <input
                  type='checkbox'
                  value={HorseCollarMod}
                  name='HorseCollarMod'
                  onChange={HorseCollar_CheckedChanged}
                />
                <div>Хомут</div>
              </div>
              <div className={s.bodyRow}>
                <input type='checkbox' value={HeavyPlowMod} name='HeavyPlowMod' onChange={HeavyPlow_CheckedChanged} />
                <div>Тяжелый плуг</div>
              </div>
              <div className={s.bodyRow}>
                <input
                  type='checkbox'
                  value={CropRotationMod}
                  name='CropRotationMod'
                  onChange={CropRotation_CheckedChanged}
                />
                <div>Севооборот</div>
              </div>
            </div>
            <div className={s.flexRow}>
              <div className={s.bodyRow}></div>
            </div>
            <div className={s.flexRow}>
              <div className={s.bodyRow}></div>
            </div>
            <div className={s.flexRow}>
              <div className={s.bodyRow}></div>
            </div>
            <div className={s.bodyRow}></div>

            <div className={s.flexRow}>
              <div className={s.bodyRow}>
                <input
                  type='checkbox'
                  value={DoubleAxeMod}
                  name='DoubleAxeMod'
                  onChange={DoubleBitAxe_CheckedChanged}
                />
                <div>Двуострый топор</div>
              </div>
              <div className={s.bodyRow}>
                <input type='checkbox' value={BowSawMod} name='BowSawMod' onChange={BowSaw_CheckedChanged} />
                <div>Лучковая пила</div>
              </div>
              <div className={s.bodyRow}>
                <input type='checkbox' value={TwoManSawMod} name='TwoManSawMod' onChange={TwoManSaw_CheckedChanged} />
                <div>Двуручная пила</div>
              </div>
            </div>
            <div className={s.flexRow}>
              <div className={s.bodyRow}>
                <input
                  type='checkbox'
                  value={GoldMiningMod}
                  name='GoldMiningMod'
                  onChange={GoldMining_CheckedChanged}
                />
                <div>Золотодобыча</div>
              </div>
              <div className={s.bodyRow}>
                <input
                  type='checkbox'
                  value={GoldShaftMiningMod}
                  name='GoldShaftMiningMod'
                  onChange={GoldShaftMining_CheckedChanged}
                />
                <div>Золотые рудники</div>
              </div>
            </div>
            <div className={s.flexRow}>
              <div className={s.bodyRow}>
                <input
                  type='checkbox'
                  value={StoneMiningMod}
                  name='StoneMiningMod'
                  onChange={StoneMining_CheckedChanged}
                />
                <div>Каменоломни</div>
              </div>
              <div className={s.bodyRow}>
                <input
                  type='checkbox'
                  value={StoneShaftMiningMod}
                  name='StoneShaftMiningMod'
                  onChange={StoneShaftMining_CheckedChanged}
                />
                <div>Каменные рудники</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.body}>
        <div className={s.bodyHeader}>Значения</div>
        <div className={s.bodyRow}>
          <div>{(CalculatedFoodRate * 60).toFixed(0)}</div>
          <div>пищи/мин</div>
        </div>
        <div className={s.bodyRow}>
          <div>{(CalculatedWoodRate * 60).toFixed(0)}</div>
          <div>дерева/мин</div>
        </div>
        <div className={s.bodyRow}>
          <div>{(CalculatedGoldRate * 60).toFixed(0)}</div>
          <div>золота/мин</div>
        </div>
        <div className={s.bodyRow}>
          <div>{(CalculatedStoneRate * 60).toFixed(0)}</div>
          <div>камня/мин</div>
        </div>
        <div className={s.bodyRow}>
          <div>{FarmWoodCostRate}</div>
          <div>дерева/мин на содержание ферм</div>
        </div>
      </div>
    </div>
  )
}

export default App

// int.TryParse(FarmersCount.Text, out int iFarmersCount);
// int.TryParse(ForagersCount.Text, out int iForagersCount);
// int.TryParse(HuntersCount.Text, out int iHuntersCount);
// int.TryParse(ShepherdCount.Text, out int iShepherdsCount);
// int.TryParse(FishermansCount.Text, out int iFishermansCount);
// int.TryParse(LumberjackCount.Text, out int iLumberjackCount);
// int.TryParse(MinerCount.Text, out int iMinersCount);
// int.TryParse(StoneCollectorsCount.Text, out int iStoneCollectorsCount);
// double CalculatedFarmProductionRate = BaseFarmerGatheringRate * WheelbarrowMod * HandCartMod;
// CalculatedFarmProductionRate = CalculatedFarmProductionRate > 0.44 ? 0.44 : CalculatedFarmProductionRate;
// double CalculatedFoodRate =
//     iFarmersCount * CalculatedFarmProductionRate +
//     iForagersCount * BaseForagerMinerGatheringRate * WheelbarrowMod * HandCartMod * ForagerWalkingFactor +
//     iHuntersCount * BaseHunterGatheringRate * WheelbarrowMod * HandCartMod * HunterWalkingFactor +
//     iShepherdsCount * BaseShepherdMinerGatheringRate * WheelbarrowMod * HandCartMod * ShepherdWalkingFactor+
//     iFishermansCount * BaseFishermanGatheringRate * WheelbarrowMod * HandCartMod * FishermanWalkingFactor;
// double CalculatedWoodRate = iLumberjackCount * BaseLumberjackGatheringRate * DoubleAxeMod * BowSawMod * TwoManSawMod * WheelbarrowMod * HandCartMod;
// double CalculatedGoldRate = iMinersCount * BaseGoldMinerGatheringRate * GoldMiningMod * GoldShaftMiningMod * WheelbarrowMod * HandCartMod;
// double CalculatedStoneRate = iStoneCollectorsCount * BaseStoneMinerGatheringRate * StoneMiningMod * StoneShaftMiningMod * WheelbarrowMod * HandCartMod;
// FoodCount.Text = (CalculatedFoodRate * 60).ToString();
// WoodCount.Text = (CalculatedWoodRate * 60).ToString();
// GoldCount.Text = (CalculatedGoldRate * 60).ToString();
// StoneCount.Text = (CalculatedStoneRate * 60).ToString();
// double FarmFoodAmount = FarmBaseFoodAmount + HorseCollarMod + HeavyPlowMod + CropRotationMod;
// double FarmLivingTime = (FarmFoodAmount / CalculatedFarmProductionRate) + FarmBaseBuildingTime;
// double FarmWoodCostRate = FarmBaseCost * iFarmersCount * (60 / FarmLivingTime);
// FarmCostPerMinute.Text = Math.Round(FarmWoodCostRate, 1).ToString();
