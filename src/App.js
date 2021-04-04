import { useState } from 'react'
import s from './App.css'

const initialState = {
  iFarmersCount: 0,
  iForagersCount: 0,
  iHuntersCount: 0,
  iShepherdsCount: 0,
  iFishermansCount: 0,
  iLumberjackCount: 0,
  iMinersCount: 0,
  iStoneCollectorsCount: 0
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
const LumberjackWalkingFactor = 1
const AllMinerWalkingFactor = 1
//wood upgrades
const DoubleAxeMod = 1
const BowSawMod = 1
const TwoManSawMod = 1
//gold upgrades
const GoldMiningMod = 1
const GoldShaftMiningMod = 1
//stone upgrades
const StoneMiningMod = 1
const StoneShaftMiningMod = 1
//carts
const WheelbarrowMod = 1
const HandCartMod = 1
//Farms data
const HorseCollarMod = 0
const HeavyPlowMod = 0
const CropRotationMod = 0
const FarmBaseFoodAmount = 175
const FarmBaseBuildingTime = 15
const FarmBaseCost = 60

const App = () => {
  const [
    {
      iFarmersCount,
      iForagersCount,
      iHuntersCount,
      iShepherdsCount,
      iFishermansCount,
      iLumberjackCount,
      iMinersCount,
      iStoneCollectorsCount
    },
    setState
  ] = useState(initialState)
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
  return (
    <div>
      <div>
        <div>Рейты</div>
      </div>
      <div>
        <div>Значения</div>
        <div>
          <div>{CalculatedFoodRate}</div>
          <div>пищи/мин</div>
        </div>
        <div>
          <div>{CalculatedWoodRate}</div>
          <div>дерева/мин</div>
        </div>
        <div>
          <div>{CalculatedGoldRate}</div>
          <div>золота/мин</div>
        </div>
        <div>
          <div>{CalculatedStoneRate}</div>
          <div>камня/мин</div>
        </div>
        <div>
          <div>{CalculatedFoodRate}</div>
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
