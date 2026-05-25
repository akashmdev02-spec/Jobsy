const load = async (search) => {
  setLoading(true)
  try { 
    const response = await jobsApi.listPublic(search || '')
    
    // ✅ ADD THIS: detect backend error object
    if (response && response.code && response.message) {
      console.error('Backend error:', response)
      toast.error(response.message || 'Server error')
      setJobs([])
      return
    }

    if (Array.isArray(response)) {
      setJobs(response)
    } else if (response && Array.isArray(response.data)) {
      setJobs(response.data)
    } else {
      setJobs([])
    }
  } 
  catch (e) { 
    setJobs([])
    toast.error(e?.response?.data?.error || 'Failed to load jobs') 
  }
  finally { setLoading(false) }
}
