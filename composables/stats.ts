import { useLocalStorage } from '@vueuse/core';

export const useStats = (member: Member) => {
  const rating = ref<number>(0);
  const dailyGoal = ref<number>(0);
  const weeklyGoal = ref<number>(0);
  const currentDailyGoal = ref<number>(0);
  const currentWeeklyGoal = ref<number>(0);
  
  const lastChoreUpdate = useLocalStorage(`lastChoreUpdate/${member.id}`, new Date());

  const reloadStats = async () => {
    const stats = await fetchTodoistProductivityStats(member.todoistToken);

    const currentDaily = stats.days_items[0].total_completed;
    const currentWeekly = stats.week_items[0].total_completed;

    const dailyStreakBonus = 1 * (stats.goals.current_daily_streak.count);
    const weeklyStreakBonus = 2 * (stats.goals.current_weekly_streak.count);

    rating.value = currentDaily + dailyStreakBonus + weeklyStreakBonus;

    dailyGoal.value = stats.goals.daily_goal;
    weeklyGoal.value = stats.goals.weekly_goal;
    currentDailyGoal.value = currentDaily;
    currentWeeklyGoal.value = currentWeekly;
  };

  watch(lastChoreUpdate, reloadStats, { immediate: true });

  return {
    rating,
    dailyGoal,
    weeklyGoal,
    currentDailyGoal,
    currentWeeklyGoal
  }
}
