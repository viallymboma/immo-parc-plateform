"use client";

import useSWR from 'swr';

import apiClient from '@/lib/apiClient';

import { useUserInfo } from './useUserInfo';

const fetcher = async (url: string) => {
    const response = await apiClient.get(url);
    return response.data;
};

const useFetchTasks = () => {
    const { user } = useUserInfo ()
    const { data: tasksDataSet, error, isValidating, mutate } = useSWR('http://localhost:5000/tasks/users-tasks', fetcher, {
        refreshInterval: 0, // Disable periodic revalidation
        revalidateOnFocus: false, // Disable revalidation on window focus
        revalidateOnReconnect: false, // Disable revalidation on reconnect
    });
    // console.log(tasksDataSet, "mrciiiii")
    return {
        tasksDataSet, 
        error, isValidating
    }
}

export default useFetchTasks